import React from "react";
import styles from "../../../assets/css/public/VisualProof.module.css";
import { NyxusHeading } from "../../../components/ui/NyxusTitle";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ScrollFadeIn from "../../../components/ui/FadeIn";

interface ShowcaseProps {
    image: string;
}

const VisualProof: React.FC<ShowcaseProps> = ({ image }) => {
    const navigate = useNavigate();
    const [spinner, setSpinner] = React.useState(false);
    const navigateToRegister = () => {
        setSpinner(true);
        setTimeout(() => {
            navigate('/auth/register');
            setSpinner(false);
        }, 3000)
    }
    return (
        <>
            <div className="my-5">
                <NyxusHeading  
                    title={`Experience ${import.meta.env.VITE_APP_NAME} in Action`}
                    align="center"
                />
            </div>

            <section className={`container-fluid ${styles.section}`}>
                <div className="container">
                    <div className="row">

                        {/* TEXT SIDE */}
                        <div className="col-12 col-md-12 col-lg-6 my-5">
                            <div className={styles.textWrapper}>
                                <h2 className={styles.title}>
                                    Experience {import.meta.env.VITE_APP_NAME} in Action
                                </h2>

                                <p className={styles.desc}>
                                    Take full control of your investments with a powerful and intuitive 
                                    dashboard designed to help you track, manage, and grow your capital 
                                    effortlessly in real-time.
                                </p>

                                <ul className={styles.list}>
                                    <ScrollFadeIn>
                                        <li><FontAwesomeIcon icon={faSpinner} spin className="small" /> Real-time portfolio tracking</li>
                                    </ScrollFadeIn>
                                    <ScrollFadeIn>
                                        <li><FontAwesomeIcon icon={faSpinner} spin className="small" /> Smart investment insights</li>
                                    </ScrollFadeIn>
                                    <ScrollFadeIn>
                                        <li><FontAwesomeIcon icon={faSpinner} spin className="small" /> Secure and fast transactions</li>
                                    </ScrollFadeIn>
                                </ul>

                                <button className={`${styles.cta} rounded-0 btn btn-normal text-white`} onClick={navigateToRegister}>
                                    Get Started {spinner ? (
                                        <FontAwesomeIcon icon={faSpinner} spin className="ms-2 small text-success" />
                                    ): null}
                                </button>
                            </div>
                        </div>

                        {/* IMAGE SIDE */}
                        <div className="col-12 col-md-12 col-lg-6">
                            <div className={styles.imageWrapper}>
                                <img src={image} alt="Nyxus Dashboard Preview" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default VisualProof;