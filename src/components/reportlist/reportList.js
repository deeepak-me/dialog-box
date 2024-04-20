import styles from "./reportList.module.css";

const ReportList = ({ reports }) => {
  return (
    <div className={styles.listContainer}>
      <h2>Recently Generated Reports</h2>
      <ul>
        {reports.map((report, index) => (
          <li key={index} className={styles.listItem}>
            <strong>{report.name}</strong> - Generated on {report.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportList;
