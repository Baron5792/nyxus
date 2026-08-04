import css from '../assets/css/utility/ProgressBar.module.css'

export const ProgressBar = ({ level = 70 }) => {
    return (
        <div className={css.securityStrength}>
            <div className={css.progressContainer}>
                <div
                    className={css.progressFill}
                    style={{ width: `${level}%` }}
                ></div>
            </div>
        </div>
    );
}