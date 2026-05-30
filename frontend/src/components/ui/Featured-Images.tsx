import { FeaturedText } from "./Featured-Text";

interface FeaturedImagesProps {
    imageSrc: string;
    altText: string;
    classname: any;
}

export const FeaturedImages = ({ imageSrc, altText, classname}: FeaturedImagesProps) => {
    
    return (
        <>
            <div className={`position-relative ${classname}`}>
                <img src={imageSrc} alt={altText} className="w-100" />

                <FeaturedText 
                    overflowTitleFirst="INVEST SMARTER"
                    overflowTitleSecond="GROW FASTER"
                    overflowText={`Whether you’re just starting your investment journey or you're an experienced trader looking for efficiency and precision, ${import.meta.env.VITE_APP_NAME} gives you the control you need. Our platform is structured to connect you to diverse opportunities across multiple markets, allowing you to make informed decisions backed by clear data and smart analytics. Every feature is carefully designed to remove friction and give you a smoother, faster path to achieving your financial goals.`}
                />
            </div>
        </>
    )
}