import GoogleTranslateCustom from "../../utils/Translator";
import styles from '../../assets/css/Featured-Text.module.css';
import { LinkButtons } from "./LinkButtons";
import ScrollFadeIn from "./FadeIn";

interface FeaturedTextProps {
    overflowTitleFirst: string;
    overflowTitleSecond: string;
    overflowText: string;
}

export const FeaturedText = ({ overflowTitleFirst, overflowTitleSecond, overflowText }: FeaturedTextProps) => {
    const subText = [
        { id: 'individual ownership', text: 'Individual Ownership' },
        { id: 'secure transactions', text: 'Secure Transactions' },
        { id: 'decentralized network', text: 'Decentralized Network' },
        { id: 'transparent operations', text: 'Transparent Operations' },
    ]
    return (
        <>
            <div className="container">
                <div className={`${styles['featured-header']} position-absolute top-0 right-0`}>
                    <div>
                        <GoogleTranslateCustom />
                    </div>
                    <div className="mt-3">
                        <div className={styles['featured-main-text']}>
                            <span>{overflowTitleFirst}</span><span className="d-block">{overflowTitleSecond}</span>
                        </div>
                        <ScrollFadeIn>
                            <div className={`${styles['overflow-text']} my-3`}>
                                {overflowText}
                            </div>
                        </ScrollFadeIn>
                        {subText && (
                            <div className={`${styles['sub-text']} d-none d-md-none d-lg-block`}>
                                {subText.map((text) => (
                                    <p key={text.id}><i className="bi bi-check-square small text-success"></i> <span className="ms-2">{text.text}</span></p>
                                ))}
                            </div>
                        )}

                        <LinkButtons 
                            to="/account/register"
                            title="GET STARTED"
                            classname="btn btn-success form-control border-none rounded-0 fw-light"
                            style={{ fontFamily: 'sans-serif', fontSize: '14px' }}
                        />
                        <p className="text-white mt-1" style={{ fontFamily: 'sans-serif', fontSize: '12px' }}>v{import.meta.env.VITE_APP_VERSION} © {import.meta.env.VITE_APP_START_DATE} - {new Date().getFullYear()}</p>
                    </div>
                </div>
            </div>
        </>
    )
}