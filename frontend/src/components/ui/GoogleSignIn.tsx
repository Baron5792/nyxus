import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import styles from '../../assets/css/public/GoogleSignIn.module.css';

export const GoogleButton = ({ onClick, text = "Sign in with Google" }: any) => {
    return (
        <button type="button" className={`${styles.googleBtn} border-none`} onClick={onClick}>
            <div className={styles.iconWrapper}>
                <FontAwesomeIcon icon={faGoogle} />
            </div>
            <span className={styles.btnText}>{text}</span>
        </button>
    );
};