import { useEffect } from "react";
import FeaturedImg from '../../assets/images/featured/dark-guy.jpg';
import { FeaturedImages } from "../../components/ui/Featured-Images";
import styles from '../../assets/css/public/Home.module.css';
import TradingView from "../../utils/TradingView";
import { Rating } from "./home/Rating";
import { HowItWorks } from "./home/How-it-works";
import { Features } from "./home/Features";
import { WhyChooseUs } from "./home/Why-choose-us";
import { Trading } from "./home/Trading";
import VisualProof from "./home/Visual-Proof";
import VitualProofImg from '../../assets/images/featured/virtual proof.png';
import Testimonials from "./home/Testimonials";

export const Home = () => {
    useEffect(() => {
        document.title = `Home - ${import.meta.env.VITE_APP_NAME}`;
    }, [])
    return (
        <>
            {/* Featured image */}
            <FeaturedImages 
                classname={styles['featured-img']}
                imageSrc={FeaturedImg}
                altText={`${import.meta.env.VITE_APP_NAME} featured image`}
            />

            {/* Trading view widget */}
            <TradingView /> 

            {/* Rating from stores */}
            <Rating />

            {/* How it works */}
            <HowItWorks />

            {/* Features */}
            <Features />

            {/* Why choose us */}
            <WhyChooseUs />

            {/* Trading stuffs */}
            <Trading />

            {/* Visual Proof */}
            <VisualProof 
                image={VitualProofImg}
            />

            {/* Testimonials */}
            <Testimonials />
        </>
    )
}