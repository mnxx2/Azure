import { useContext } from 'react';
import './Hospital.css';
import DWContext from '../DoctorWitchContext';

// 검색 결과 병원 카드
export default function Hospital({hosp}) {
    // 병원 선택
    const {setSelected} = useContext(DWContext);
    // 클릭 시 선택 정보 setSelected에 추가
    const handleClick = () => setSelected(hosp);

    return (
        <div className="hosp-card" onClick={handleClick}>
            <div className="hosp-name-cont">
                <h1 className="hosp-name">{hosp.yadmNm}</h1>
            </div>
            <div className="hosp-addr">
                <span className="addr-sido">{hosp.sidoCdNm} {hosp.sgguCdNm} </span>
                <span className="addr-dong">{hosp.emdongNm}</span>
            </div>
        </div>
    )
}