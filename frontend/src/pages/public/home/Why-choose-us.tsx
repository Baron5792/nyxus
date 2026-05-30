import { ShieldCheck, Zap, TrendingUp, Globe, UserCheck } from "lucide-react";
import styles from '../../../assets/css/public/Why-choose-us.module.css';
import { NyxusHeading } from "../../../components/ui/NyxusTitle";
import ScrollFadeIn from "../../../components/ui/FadeIn";

export const WhyChooseUs = () => {
    const features = [
        { icon: <ShieldCheck size={20} />, angle: 0 },
        { icon: <Zap size={20} />, angle: 60 },
        { icon: <TrendingUp size={20} />, angle: 120 },
        { icon: <Globe size={20} />, angle: 180 },
        { icon: <UserCheck size={20} />, angle: 240 },
    ];

    const Records = [
        { id: '1', title: 'ACTIVE USERS', value: '10K', icon: '+', desc: `Investors growing their wealth daily on ${import.meta.env.VITE_APP_NAME}.` },
        { id: '2', title: 'COUNTRIES REACHED', value: '50', icon: '+', desc: 'Serving a global community of modern investors.' },
        { id: '3', title: 'CAPITAL MANAGED', value: '$1M', icon: '+', desc: 'Securely handled across diverse investment portfolios.' },
        { id: '4', title: 'PLATFORM UPTIME', value: '99.9', icon: '%', desc: 'Reliable performance you can count on anytime.' }
    ]

    return (
        <>
            <div className="container-fluid my-5">
                <NyxusHeading 
                    title={`Why Choose ${import.meta.env.VITE_APP_NAME}`}
                    align="center"
                />
                <div className="row">
                    <div className="col-12 col-md-12 col-lg-6 col-xl-7">
                        <div className={styles['circle-wrapper']}>
                            <div className={styles['circle']}>

                                {/* Center Content */}
                                <div className={styles['center-content']}>
                                    <ScrollFadeIn>
                                        <h3>{import.meta.env.VITE_APP_NAME}</h3>
                                        <p>Smart. Scalable. Built for the future.</p>
                                    </ScrollFadeIn>
                                </div>

                                {/* Orbit Icons */}
                                {features.map((item, index) => (
                                    <div
                                        key={index}
                                        className={styles['circle-item']}
                                        style={{
                                        transform: `rotate(${item.angle - 32}deg) translate(175px) rotate(-${item.angle }deg)`
                                        }}
                                    >
                                        {item.icon}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    
                    <div className="col-12 col-md-12 col-lg-6 col-xl-5">
                        <div className="container">
                            <div className={`row ${styles['records-row']}`}>
                                {Records.map((record, index) => (
                                    <div className="col-6 col-md-6 col-lg-6 xl-6 mt-4" key={index} title={record.desc}>
                                        <div>
                                            <div className="d-flex">
                                                <p className="fs-2 fw-bold mb-0" style={{ color: 'var(--accent-color)', fontFamily: 'sans-serif' }}>{record.value}</p>
                                                <sup className="fs-5 text-danger">{record.icon}</sup>
                                            </div>
                                            <p style={{ fontFamily: 'sans-serif' }} className="small fw-bold">{record.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </>
    )
}