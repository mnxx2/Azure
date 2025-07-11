import { useContext, useEffect, useState } from "react";
import DWContext from "../DoctorWitchContext";
import './HospCodeButton.css';


// 진료과목 코드 정보 받아 버튼 생성하는 컴포넌트
export default function HospCodeButton() {
    const [dept, setDept] = useState([]);
    const [error, setError] = useState(null);
    const {selectedDept, setSelectedDept} = useContext(DWContext);

    useEffect(() => {
        const isDeptCodes = async () => {
            const svKey = '5mvYuEF7TtTatpK%2BZy2dYOwu6UeSq1m6%2Bb5NccQvSbXfqKBY6t6xr5lZSTNd0obBw0nvR1px99ne13AcQKw9pw%3D%3D';
            const codeUrl = `https://apis.data.go.kr/B551182/codeInfoService/getMdlrtSbjectCodeList?ServiceKey=${svKey}&_type=json`
    
            try {
                const cdRes = await fetch(codeUrl);
    
                if(!cdRes.ok) {
                    const msg = await cdRes.text();
                    console.log(msg)
                    throw new Error('진료 과목 데이터를 가져오지 못했습니다.', cdRes.status);
                }
                    
                const data = await cdRes.json();
                console.log(data.response.body.items.item);
    
                const codeData = data.response.body.items.item;
                setDept(codeData);
    
                console.log(dept);
            } catch(error) {
                setError(error);
            }
        }
    
        isDeptCodes();
    }, []);

    if(error) {
        return <div>에러 발생 : {error.message}</div>
    }

    if(!dept) {
        return <div>진료 과목 목록 로딩중. . .</div>
    }

    return (
        <div className="code-container">
            <h2 className="dpt-msg">진료 과목으로도 찾아볼 수 있어요!</h2>
            <div className="code-btns">
                {
                    dept.map((code) => {
                        return(
                        <div className="code-btn" key={code.dgsbjtCd}>
                            <div 
                                onClick={() => setSelectedDept({code: code.dgsbjtCd, name: code.dgsbjtCdNm})}>
                                {
                                    // 일반의는 없으므로 전체 목록으로 변경
                                    code.dgsbjtCd !== '00' ? (
                                        code.dgsbjtCdNm
                                    ) : (
                                        '전체 목록'
                                    )
                                }
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}