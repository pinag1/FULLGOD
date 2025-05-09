import '../../styles/global.css';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      paginate(page);
    }
  };
  const renderPagination = () => {
    const pages = [];
    if (currentPage > 1) {
      pages.push(1);
    }
    if (currentPage > 2) {
      pages.push("...");
    }
    pages.push(currentPage);
    if (currentPage < totalPages - 1) {
      pages.push("...");
    }
    if (currentPage < totalPages) {
      pages.push(totalPages);
    }
    if (currentPage === 1 && totalPages > 1) {
      pages.splice(1, 0, 2);
    }

    return pages;
  };

  const handleDotsClick = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      handlePageChange(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li
          className={currentPage === 1 ? "disabled" : ""}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <a role="button" aria-label="Previous Page">
            «
          </a>
        </li>

        {renderPagination().map((page, index) => (
          <li
            key={index}
            className={page === currentPage ? "active" : ""}
            onClick={() => {
              if (page !== "..." && page !== currentPage) {
                handlePageChange(page);
              } else if (page === "...") {
                handleDotsClick(index === 1 ? "prev" : "next");
              }
            }}
          >
            <a role="button">{page}</a>
          </li>
        ))}

        <li
          className={currentPage === totalPages ? "disabled" : ""}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <a role="button" aria-label="Next Page">
            »
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
