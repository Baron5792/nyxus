import React, { ReactNode } from "react";
import styles from "../../assets/css/NyxusHeading.module.css";

type Props = {
    title: string;
    preTitle?: string;
    align?: "left" | "center";
    variant?: "line" | "glow" | "dot";
    children?: ReactNode;
};

export const NyxusHeading: React.FC<Props> = ({
    title,
    preTitle,
    align = "left",
    variant = "line",
    children
}) => {
    return (
        <div className={`${styles.wrapper} ${styles[align]}`}>
            {preTitle && <span className={styles.preTitle}>{preTitle}</span>}

            <h2 className={styles.title}>{title}</h2>

            <div
                className={`${styles.accent} ${
                    variant === "glow"
                        ? styles.glow
                        : variant === "dot"
                        ? styles.dot
                        : styles.line
                    }`}
                />
                {children}
            </div>
    );
};