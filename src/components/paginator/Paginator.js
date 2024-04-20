import React from "react";
import styles from "./Paginator.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        className={`${styles.paginatorButton} ${
          currentPage === i ? styles.active : ""
        }`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className={styles.paginatorContainer}>
      <button
        className={styles.paginatorButton}
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        Prev
      </button>
      {pages}
      <button
        className={styles.paginatorButton}
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        Next
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Paginator;
