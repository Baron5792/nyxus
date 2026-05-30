import type React from "react";
import styles from '../../assets/css/public/OtherFeaturedImages.module.css';

interface OtherFeaturedProps {
    img: string;
    classname: any;
    altName: string;
    style: React.CSSProperties;
}

export const OtherFeatured = ({ img, classname, altName, style }: OtherFeaturedProps) => {
    return (
        <>
            <div className={`position-relative top-0`}>
                <div className={styles['hero-bg']}></div>
                <div className={`top-0 ${classname}`}>
                    <img src={img} alt={altName} style={style} />
                </div>
            </div>
        </>
    )
}