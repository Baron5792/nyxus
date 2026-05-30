import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFlip, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';

import css from '../../assets/css/client/Container-Design.module.css';
import styles from '../../assets/css/client/VirtualCard.module.css'
import { Eye } from 'lucide-react';

interface VirtualCardProps {
    cardNumber: any;
    cardHolderName: string;
    expiryDate: any;
    cardType: any;
    cvcNumber: string;
}

export const VirtualCard = ({ cardNumber, cardHolderName, expiryDate, cardType, cvcNumber }: VirtualCardProps) => {
    return (
        <div className={css['container']}>
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
                            <div className="d-flex justify-content-between align-items-start">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="fs-5">{import.meta.env.VITE_APP_NAME}</span>
                                </div>
                                <i className="bi bi-wifi" style={{ transform: 'rotate(90deg)', fontSize: '1.2rem' }}></i>
                            </div>

                            <div className={styles.chip + " mt-3"}></div>
                            
                            <div className={`${styles.cardNumber} my-2`}>
                                {cardNumber}
                            </div>

                            <div className="d-flex justify-content-between align-items-end mt-auto">
                                <div>
                                    <p className={styles.label}>Card Holder</p>
                                    <p className={styles.value}>{cardHolderName}</p>
                                </div>
                                <div className="text-center">
                                    <p className={styles.label}>Expires</p>
                                    <p className={styles.value}>{expiryDate}</p>
                                </div>
                                <div className=" mb-0 fw-bold italic">{cardType}</div>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* PHASE 2: BACK */}
                    <SwiperSlide>
                        <div className={`${styles.cardBase} ${styles.cardBack}`}>
                            <div className={styles.magneticStrip}></div>
                            
                            <div className="px-2 mt-2">
                                <p className={styles.label} style={{ textAlign: 'right', paddingRight: '1%' }}>CVC</p>
                                <div className={styles.signatureArea}>
                                    <span className={styles.cvcText}>{cvcNumber}</span>
                                </div>
                            </div>

                            <div className="px-1 mt-0">
                                <p style={{ fontSize: '0.55rem', opacity: 0.6, lineHeight: '1.3' }}>
                                    This virtual card is property of {import.meta.env.VITE_APP_NAME}. Authorized signature is not required. 
                                    Use of this card is subject to the terms and conditions provided in your dashboard.
                                </p>
                            </div>
                            
                            <div className="text-end px-4 mt-2">
                                <span className="fw-lighter opacity-50">{import.meta.env.VITE_APP_NAME} Fintech</span>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>

                {/* card footer */}
                <div className='d-flex align-items-center justify-content-between pt-2'>
                    <button type="button" className='btn btn-normal text-secondary border-end border-start' style={{ fontFamily: 'sans-serif', fontSize: '13px' }}>Show Details <Eye size={19} strokeWidth={1} /></button>

                    <button type="button" className='btn btn-normal text-secondary border-start border-end' style={{ fontFamily: 'sans-serif', fontSize: '13px' }}>Copy Card</button>
                </div>
            </div>
        </div>
    );
};