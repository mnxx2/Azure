// aside를 차지하는 hospital search 화면 컴포넌트
import './HospSearchArea.css';
import { useContext, useEffect, useState } from "react";
import HospitalList from "./HospitalList";
import HospSearchBar from "./HospSearchBar";
import Paginatiion from "./Pagination";
import HospCodeButton from "./HospCodeButton";
import DWContext from "../DoctorWitchContext";

export default function HospSearchArea() {
    // 변하는 query useState 관리
    // 시군구 등 지역 검색
    const [dongNm, setDongNm] = useState('');
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [error, setError] = useState(null);
    const [hospitals, setHospitals] = useState([]);
    // 로딩 상태
    const [isLoading, setIsLoading] = useState(false);
    // 사용자 위치
    const [location, setLocation] = useState('');
    // 선택된 진료 과목
    const {selectedDept, setSelectedDept, setSelected} = useContext(DWContext);

    // 사용자 위치 가져오기
    useEffect(() => {
        // 사용자 위치
        navigator.geolocation.getCurrentPosition(async (position) => {
            const {latitude, longitude} = position.coords;
            // 위도 경도로 되어있는 위치 주소로 변환
            const dong = await convertCoords(latitude, longitude);
            // 변환된 주소 기본값으로 넣기
            setDongNm(dong);
            setLocation({latitude, longitude});
        });
    }, [])

    // 위도 / 경도로 된 사용자 위치 주소로 변환 api
    const convertCoords = async (lat, lon) => {
        const kakaoKey = '2e167e85cbc39554ee1a47a9ff4e83c0';
        const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lon}&y=${lat}`;
        const kresponse = await fetch(url, {
            headers: {
                Authorization: `KakaoAK ${kakaoKey}`,
            },
        });

        const locData = await kresponse.json();
        // locData.documents : 사용자 위치 중 시 + 구 + 동
        // 배열은 2개 [0][1]이 나오는데 0은 대략적, 1은 상세주소
        // region_1depth_name : 시, 2 : 구, 3 : 동 , 없으면 공백
        const userDName = locData.documents?.[0]?.region_3depth_name || '';
        console.log(locData.documents)

        return userDName;
    }

    // 비동기 처리로 병원정보서비스api 사용 > 데이터 로딩이 오래 걸려서 submit으로 변경
    // useEffect로 쿼리가 바뀔때마다 리렌더링하면 너무 오래 걸려서 사용 불가
    // currentPage : 페이지 번호를 받는 매개변수, 함수가 호출될 때 전달
    const findHospitals = async (currentPage = 1) => {
        setError(null);
        // endPoint 및 고정 query 따로 빼두기
        const serviceKey = '5mvYuEF7TtTatpK%2BZy2dYOwu6UeSq1m6%2Bb5NccQvSbXfqKBY6t6xr5lZSTNd0obBw0nvR1px99ne13AcQKw9pw%3D%3D';

        // 검색어가 지역명인지 판별
        // .test() : 정규식 판별 메소드, t/f반환
        // / ... / : 정규 표현식. 문자열 안에 특정 패턴이 있는지 검사
        const isHospName = !/(시|도|구|군|동)/.test(dongNm);
        
        // URLSearchParams : url의 쿼리 문자열 다루는 내장 API
        // 파라미터 파싱, 추가, 수정, 삭제 등
        const param = new URLSearchParams({
            // 자동으로 한번 더 인코딩되기 때문에 디코딩
            ServiceKey : decodeURIComponent(serviceKey),
            pageNo : currentPage,
            _type : 'json',
        })

        // 진료과목 선택 시 param 추가
        // dgsbjtCd == 00 > undefined, 로딩중 화면에 멈춤 > 00 선택 시 전체 목록이 출력되도록
        if(selectedDept?.code && selectedDept.code !== "00") {
            param.append('dgsbjtCd', selectedDept.code);
        }

        // isHospName 결과에 따라 병원명 / 지역명 중 선택, param 추가
        if(isHospName) {
            param.append('yadmNm', dongNm);
        } else {
            param.append('emdongNm', dongNm);
        }

        const endPoint = 
            `https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList?${param}`;
        
        try {
            // 로딩 시작
            setIsLoading(true);
            
            const response = await fetch(endPoint);

            // response status 검증
            if(!response.ok) {
                throw new Error('데이터를 가져오지 못했습니다.', response.status);
            }

            const data = await response.json();
            console.log(data.response.body.items.item);

            // 데이터가 없으면 빈 배열로 설정
            const hospData = data.response.body.items?.item || [];
            const total = data.response.body.totalCount;

            setHospitals(hospData || []);
            setTotalCount(total);
        } catch(error) {
            setError(error);
        } finally{
            // 로딩 종료
            setIsLoading(false); 
        }
    };

    // 진료과목 코드가 바뀔때마다 다시 검색
    useEffect(() => {
            if(selectedDept) {
                setPage(1);
                setSelected(null);  // hospDetail 초기화
                findHospitals(1);
            }
        }, [selectedDept])

    // 검색 버튼 클릭 시 호출
    const searchHospitals = () => {
        setError(null);
        setPage(1);
        setSelected(null);  // 진료과목 버튼을 누르거나 검색어 입력 시 초기화
        findHospitals(1);   // 해당 페이지 데이터 불러오기
    }

    // 페이지 변경 시 호출
    const handlePageChange = (newPage) => {
        setPage(newPage);
        findHospitals(newPage);
    }

    // error 발생 시 화면에 error 출력
    if(error) {
        return <div className="error-msg">오류발생 : {error.message}</div>
    }

    // hospital data를 아직 받지 못했을 때 / 아직 로딩이 true일때 화면에 출력
    if(!hospitals || isLoading) {
        return <div className="load-msg">병원 목록 로딩중. . .
            </div>
    }

    return (
        <div className="search-area">
            <h2 className='qus'>어떤 병원을 찾고 계신가요?</h2>
            <HospSearchBar dongNm={dongNm} setDongNm={setDongNm} searchHospitals={searchHospitals}/>
            <HospCodeButton/>
            {
                // 검색 결과가 없을 때 출력
                hospitals.length === 0 ? (
                    <>
                        <div style={{margin: '2rem'}}>검색 결과가 없습니다.</div>
                    </>
                ) : (
                    <div className='hosp-list-all'>
                        <HospitalList hosps={hospitals} />
                        <Paginatiion page={page} totalCount={totalCount} onPageChange={handlePageChange}/>
                    </div>
                )
            }    
        </div>
    )
}