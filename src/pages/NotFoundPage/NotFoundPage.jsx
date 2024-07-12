import { Link } from "react-router-dom";
import styles from "./notFoundPage.module.css"


const NotFoundPage = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.textWrap}>
        <h2>Page not found!</h2>
        <Link to="/home" className={styles.link}>
          <button className={styles.button}>To home page</button>
        </Link>

      </div>

    </div>
  )
}

export default NotFoundPage;
