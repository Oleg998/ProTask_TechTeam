import { Blocks } from 'react-loader-spinner';
import styles from "./loader.module.css"


const Loader = () => {
    return (
    <div className={styles.Loader}>
         <Blocks
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass=""
         />
    </div>
    )
}

export default Loader;