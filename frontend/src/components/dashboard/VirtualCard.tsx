import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFlip, Pagination } from 'swiper/modules';
import { useUser } from '../../context/authContext';
import { useState } from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';

import css from '../../assets/css/client/Container-Design.module.css';
import styles from '../../assets/css/client/VirtualCard.module.css'
import { Check, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '../../context/ThemeContext';

interface VirtualCardProps {
    cardNumber: any;
    cardHolderName: string;
    expiryDate: any;
    cardType: any;
    cvcNumber: string;
}
export const VirtualCard = ({ cardNumber, cardHolderName, expiryDate, cardType, cvcNumber }: VirtualCardProps) => {
    const { user } = useUser();
    const [check, setCheck] = useState(false);
    const copyCardDetails = () => {
        try {
            window.navigator.clipboard.writeText(user?.cardNumber);
            setCheck(true);
            setTimeout(() => {
                setCheck(false);
            }, 2000);
        }

        catch (e) {
            console.error('Error copying card details:', e);
            toast.error('Failed to copy card details');
        }
    }

    const { theme } = useTheme();

    return (
        <div className={theme === 'dark' ? css['dark-container'] : css['container']}>
            <div className={styles.cardWrapper}>
                {/* Header with Dot - Using your Bootstrap preference */}
                <div className="d-flex align-items-center justify-content-between mb-3 px-1">
                    <span className="fw-bold small text-white" style={{ fontFamily: 'sans-serif' }}>Virtual Card</span>
                    <span className="small d-flex align-items-center gap-2" style={{ color: 'lightgreen' }}>
                        Active 
                        <span className="rounded-circle" style={{ width: '8px', height: '8px', backgroundColor: 'lightgreen' }}></span>
                    </span>
                </div>

                <Swiper
                    effect={'flip'}
                    grabCursor={true}
                    modules={[EffectFlip, Pagination, Autoplay]}
                    className="mySwiper"
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                >
                    {/* PHASE 1: FRONT */}
                    <SwiperSlide>
                        <div className={`${styles.cardBase} ${styles.cardFront}`}>
                            <section className="d-flex justify-content-between align-items-start">
                                <section className="d-flex align-items-center gap-2">
                                    <span className="fs-5">{import.meta.env.VITE_APP_NAME}</span>
                                </section>
                                <i className="bi bi-wifi" style={{ transform: 'rotate(90deg)', fontSize: '1.2rem' }}></i>
                            </section>

                            <section className={styles.chip + " mt-3"}></section>
                            
                            <section className={`${styles.cardNumber} my-2`}>
                                {cardNumber}
                            </section>

                            <section className="d-flex justify-content-between align-items-end mt-auto">
                                <section className="text-center">
                                    <p className={styles.label}>Card Holder</p>
                                    <p className={styles.value}>{cardHolderName}</p>
                                </section>
                                <section className="text-center">
                                    <p className={styles.label}>Expires</p>
                                    <p className={styles.value}>{expiryDate}</p>
                                </section>
                                <section className="text-center">
                                    <p className={styles.label}>Card Type</p>
                                    <p className={styles.value}>{cardType}</p>
                                </section>
                            </section>
                        </div>
                    </SwiperSlide>

                    {/* PHASE 2: BACK */}
                    <SwiperSlide>
                        <section className={`${styles.cardBase} ${styles.cardBack}`}>
                            <section className={styles.magneticStrip}></section>

                            <section className="px-2 mt-2">
                                <p className={styles.label} style={{ textAlign: 'right', paddingRight: '1%' }}>CVC</p>
                                <section className={styles.signatureArea}>
                                    <span className={styles.cvcText}>{cvcNumber}</span>
                                </section>
                            </section>

                            <section className="px-1 mt-0">
                                <p style={{ fontSize: '0.55rem', opacity: 0.6, lineHeight: '1.3' }}>
                                    This virtual card is property of {import.meta.env.VITE_APP_NAME}. Authorized signature is not required. 
                                    Use of this card is subject to the terms and conditions provided in your dashboard.
                                </p>
                            </section>
                            
                            <div className="text-end px-4 mt-2 py-2 small">
                                <span className="fw-lighter opacity-50">{import.meta.env.VITE_APP_NAME} Fintech</span>
                            </div>
                        </section>
                    </SwiperSlide>
                </Swiper>

                {/* card footer */}
                <div className='d-flex align-items-center justify-content-between pt-2'>
                    <button type="button" className='btn btn-normal text-secondary border-end border-start' style={{ fontFamily: 'sans-serif', fontSize: '13px' }}>Show Details <Eye size={19} strokeWidth={1} /></button>

                    <button type="button" className='btn btn-normal text-secondary border-start border-end' style={{ fontFamily: 'sans-serif', fontSize: '13px' }} onClick={copyCardDetails}>Copy Card {check && <Check size={12} strokeWidth={1} />}</button>
                </div>
            </div>
        </div>
    );
};