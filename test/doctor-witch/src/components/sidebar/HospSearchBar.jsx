import './HospSearchBar.css'

// 지역명으로 위치 검색
export default function HospSearchBar({dongNm, setDongNm, searchHospitals}) {
    // 검색어를 지역명에 추가
    const handleChange = (e) => setDongNm(e.target.value);
    // 
    const handleSubmit = (e) => {
        e.preventDefault();
        
        searchHospitals();
    }

    return (
        <>
            <h2 className='loca-msg'>지역으로 찾아보세요!</h2>
            <form className="search-bar" onSubmit={handleSubmit}>
                <input type="text" 
                    value={dongNm}
                    onChange={handleChange}/>
                <button type="submit">
                    <img className='search-icon' src="search-icon2.png"/>
                </button>
            </form>
        </>
    )
}