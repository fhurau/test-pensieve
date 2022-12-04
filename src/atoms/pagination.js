import React from "react";
import { Button } from "react-bootstrap";
import "../App.css";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return (
          <Button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={
              page === currentPage
                ? "active bg-dark border border-0"
                : "bg-none border border-0 bg-transparent"
            }
          >
            {page}
          </Button>
        );
      })}
    </div>
  );
};

export default Pagination;
