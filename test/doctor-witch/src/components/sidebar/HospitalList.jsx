import { useContext } from "react"
import Hospital from "./Hospital"
import DWContext from "../DoctorWitchContext"
import './HospitalList.css'

// hospital 정보를 받아 hospital에 전달, 목록 생성 컴포넌트
export default function HospitalList({hosps}) {
    const {setSelected, selectedDept} = useContext(DWContext);

    // 만약 결과가 배열이 아니라면 안내 메시지 출력
    if(!Array.isArray(hosps)) {
        return <div>병원이 없습니다. 다시 검색해주세요.</div>
    }

    return (
        <div className="hosp-list">
            <h3>검색목록</h3>
            <div className="hosp-title">
                <span>
                    <h3>병원명</h3>
                </span>
                <span>
                    <h3>지역</h3>
                </span>
            </div>
            <div className="hosp-list-tb">
                {
                    hosps.map((hosp) => {
                        return (
                            <div key={hosp.ykiho}>
                                <Hospital hosp={hosp}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}