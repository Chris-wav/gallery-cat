import styles from "./Header.module.css";
const Header = () => {
  return (
    <div className={styles.headerContainer}>
      {" "}
      <h1 className={styles.title}>Cat Adoption Center</h1>{" "}
    </div>
  );
};
export default Header;
