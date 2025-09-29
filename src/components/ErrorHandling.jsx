import styles from "./ErrorHandling.module.css";

const ErrorHandling = ({ message }) => {
  return (
    <div className={styles.messageContainer}>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default ErrorHandling;
