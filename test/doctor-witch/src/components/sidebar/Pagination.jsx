import './Pagination.css';

// 한 페이지에 10개씩, 버튼을 누르면 페이지가 바뀌도록
export default function Paginatiion({page, totalCount, onPageChange}) {
    // 한 페이지에 데이터 10개씩 출력
    // 마지막 페이지
    const totalPages = Math.ceil(totalCount / 10);

    // 페이지가 1 이상일때만 이전 페이지 활성화
    const handlePrev = () => {
        if(page > 1) {
            onPageChange(page - 1);
        }
    }

    // 페이지가 마지막 페이지보다 작을때만 다음 페이지 활성화
    const handleNext = () => {
        if (page < totalPages) {
            onPageChange(page + 1);
        }
    }

    return (
        <div className="pagination">
            <button onClick={handlePrev} disabled={page === 1}>이전</button>
            <span>{page} / {totalPages}</span>
            <button onClick={handleNext} disabled={page === totalPages}>다음</button>
        </div>
    )
}