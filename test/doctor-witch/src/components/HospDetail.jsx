import { useContext, useEffect, useRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import DWContext from "./DoctorWitchContext";
import './HospDetail.css';

// 병원의 상세 정보와 위치(지도) 표시 컴포넌트
export default function HospDetail({hosp}) {
    const {selectedDept} = useContext(DWContext);

    // 선택된 병원이 없을 때 출력
    if(!hosp) {
        return(
            <div className="msg">병원을 선택하세요 :)</div>
        )
    }
    
    return (
        <div className="hosp-detail">
            <h3>위치</h3>
            <div className="hosp-map">
                <Map center={{lat: hosp.YPos, lng: hosp.XPos}}
                    level={3}
                    style={{width: '600px', height: '350px'}}>
                    <MapMarker position={{lat: hosp.YPos, lng: hosp.XPos}}/>
                </Map>
            </div>
            <div className="hosp-info">
                <h3>병원 상세 정보</h3>
                <div className="hosp-info-title">
                    <h2 className="hosp-name">
                        {hosp.yadmNm}
                    </h2>
                    <p className="hosp-code">
                        {hosp.clCdNm} 
                        ({
                            // 코드명이 일반의일 경우 아무것도 출력되지 않도록
                            selectedDept?.name !== '일반의' ? (
                               selectedDept?.name
                            ) : (
                                <p></p>
                            )
                        })
                    </p>
                </div>
                <div className="line"></div>
                <p className="hosp-address">
                   ({hosp.postNo}) {hosp.addr}
                </p>
                {
                    hosp.hospUrl ? 
                        <p className="hosp-url">
                            <a href={hosp.hospUrl} target="_blank">{hosp.hospUrl}</a> 
                        </p>
                        : <p>홈페이지 정보 없음</p>
                }                
                <p className="hosp-contack">
                    {hosp.telno}
                    </p>
            </div>            
        </div>
    )
}