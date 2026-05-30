import styles from "../../../assets/css/public/Testimonials.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Quote } from "lucide-react";
import Comment1 from '../../../assets/images/testimonials/comment1.png';
import Comment2 from '../../../assets/images/testimonials/comment2.png';
import Comment3 from '../../../assets/images/testimonials/comment3.png';
import Comment4 from '../../../assets/images/testimonials/comment4.jfif';
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
    {
        name: "David K.",
        text: `${import.meta.env.VITE_APP_NAME} made investing simple for me. The dashboard is clean and easy to use.`,
        country: "USA",
        avatar: Comment1
    },
    {
        name: "Sarah M.",
        text: "I love how fast withdrawals are. Everything just works smoothly.",
        country: "UK",
        avatar: Comment3
    },
    {
        name: "James L.",
        text: "Finally a platform I can trust. Real-time tracking is a game changer.",
        country: "Canada",
        avatar: Comment2
    },
    {
        name: "Anita R.",
        text: "The experience feels premium and secure. I feel confident investing here.",
        country: "Germany",
        avatar: Comment4
    }
];

const Testimonials = () => {
    return (
        <section className={styles.section}>
            <div className="container text-center">
                <span className={styles.label}>Testimonial</span>
                <h2 className={styles.title}>Transformative Client Experiences</h2>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    autoplay={{ delay: 4000 }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        992: { slidesPerView: 3 }
                    }}
                    className={styles.swiperContainer}
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className={styles.testimonialWrapper}>
                                {/* The Bubble */}
                                <div className={styles.card}>
                                    <Quote size={40} className={styles.quoteIcon} fill="var(--primary-color)" stroke="none" />
                                    <p className={styles.text}>{item.text}</p>
                                </div>
                                
                                {/* The User Info Section */}
                                <div className={styles.userSection}>
                                    <div className={styles.avatar}>
                                        {/* Replace with your image logic */}
                                        <div className={styles.placeholderImg}>
                                            <img src={item.avatar} alt={item.name} className="w-100 rounded-circle h-100" />
                                        </div>
                                    </div>
                                    <div className={styles.userInfo}>
                                        <h6>{item.name}</h6>
                                        <span>@{item.name.toLowerCase().replace(' ', '')}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;