import { useState } from "react";
import DWContext from "./DoctorWitchContext";
import HospDetail from "./HospDetail";
import HospSearchArea from "./sidebar/HospSearchArea";
import Header from "./Header";
import Footer from "./Footer";


// doctorwitch의 전체 출력 컴포넌트
export default function DoctorWitch() {
    const [selected, setSelected] = useState(null);
    const [selectedDept, setSelectedDept] = useState(null);
    return (
        <DWContext.Provider value={{setSelected, selectedDept, setSelectedDept}}>
            <div className="App">
                <Header/>
                <div className="main-content">
                    <HospSearchArea dept={selectedDept}/>
                    <HospDetail hosp={selected}/>
                </div>
                <Footer/>
            </div>
        </DWContext.Provider>

    )
}