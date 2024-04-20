//

"use client";

import React, { useState, useEffect } from "react";
import ReportList from "../components/reportlist/reportList";
import Paginator from "../components/paginator/Paginator";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const dummyData = [
  { name: "Report 1", date: "2024-04-01" },
  { name: "Report 2", date: "2024-04-05" },
  { name: "Report 3", date: "2024-04-10" },
  { name: "Report 4", date: "2024-04-15" },
  { name: "Report 5", date: "2024-04-20" },
  { name: "Report 6", date: "2024-04-25" },
  { name: "Report 7", date: "2024-04-30" },
];

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const reportsPerPageOptions = [3, 5, 10];
  const indexOfLastReport = currentPage * rowsPerPage;
  const indexOfFirstReport = indexOfLastReport - rowsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(reports.length / rowsPerPage);

  useEffect(() => {
    const fetchReports = async () => {
      const filteredReports = dummyData.filter((report) => {
        const reportDate = new Date(report.date);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return reportDate >= thirtyDaysAgo;
      });
      setReports(filteredReports);
    };

    fetchReports();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.title}>
          <h2>Recently Generated Reports</h2>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Report Name</th>
                <th className={styles.download}>Download</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map((report, index) => (
                <tr key={index}>
                  <td>{report.date}</td>
                  <td>{report.name}</td>
                  <td className={styles.download}>
                    <button>
                      <FontAwesomeIcon icon={faDownload} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.paginatorContainer}>
        <Paginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <div>
          Rows per page:{" "}
          <select
            className={styles.paginatorSelect}
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            {reportsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
