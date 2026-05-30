import React, { useRef, useEffect, useState, type ReactNode } from "react";
import css from "../../assets/css/ScrollFadeIn.module.css";

type Props = {
    children: ReactNode;
};

const ScrollFadeIn: React.FC<Props> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const element = domRef.current;
            if (!element) return;

            const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];

            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={domRef}
            className={`${css["fade-in-section"]} ${
                isVisible ? css["is-visible"] : ""
            }`}
            >
            {children}
        </div>
    );
};

export default ScrollFadeIn;