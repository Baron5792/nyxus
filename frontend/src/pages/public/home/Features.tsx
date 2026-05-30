import { Globe, LineChartIcon, Shield, Smartphone, TrendingUp, Zap } from "lucide-react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination'
import { NyxusHeading } from "../../../components/ui/NyxusTitle";

export const Features = () => {
    const features = [
        { id: '1', title: 'Secure Transactions', desc: 'Protect your assets with advanced security infrastructure built to keep your data and funds safe at all times.', icon: <Shield strokeWidth={2} size={30} /> },
        { id: '2', title: 'Real-Time Insights', desc: 'Stay ahead with live market data and track your portfolio performance as it happens.', icon: <LineChartIcon strokeWidth={2} size={30} /> },
        { id: '3', title: 'Fast Withdrawals', desc: 'Access your funds quickly with smooth and reliable withdrawal processing whenever you need it.', icon: <Zap strokeWidth={2} size={30} /> },
        { id: '4', title: 'Global Access', desc: 'Invest from anywhere in the world with seamless access across multiple regions and devices.', icon: <Globe strokeWidth={2} size={30} /> },
        { id: '5', title: 'Smart Investing', desc: 'Make confident decisions using intelligent tools designed to maximize your investment potential.', icon: <TrendingUp strokeWidth={2} size={30} /> },
        { id: '6', title: 'Cross-Platform Experience', desc: "Enjoy a consistent and optimized experience whether you're on mobile, tablet, or desktop.", icon: <Smartphone strokeWidth={2} size={30} /> },
    ]
    return (
        <>
            

            <section className="py-5">
                <NyxusHeading 
                    title="Tools Designed for Your Growth"
                    align="center"
                />
                <div className="container">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1} // Mobile default
                        loop={true}
                        autoplay={{
                            delay: 3000, // 3 seconds per slide
                            disableOnInteraction: false,
                        }}
                        speed={1000} // Speed of the transition itself (1s)
                        pagination={{ clickable: true }}
                        breakpoints={{
                            // When window width is >= 768px (Tablets)
                            768: { slidesPerView: 2 },
                            // When window width is >= 1024px (Desktops)
                            1024: { slidesPerView: 3 },
                        }}
                        className="pb-5"
                    >
                        {features.map((feature) => (
                            <SwiperSlide key={feature.id}>
                                <div className="p-4 rounded shadow-md text-white h-100">
                                    <div className="mb-5" style={{ color: 'var(--primary-color)' }}>{feature.icon}</div> 
                                    <h4 className="mb-3 text-secondary" style={{ fontFamily: 'sans-serif' }}>{feature.title}</h4>
                                    <p className="text-secondary" style={{ fontSize: '15px' }}>{feature.desc}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </>
    )
}