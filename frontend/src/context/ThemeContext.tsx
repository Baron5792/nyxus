import React, { useState, useEffect, createContext, useContext, } from 'react';
import styles from '../assets/css/ThemeToggle.module.css';

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

interface ThemeProviderProps {
    children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {

    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    );

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === 'light' ? 'dark' : 'light'
        );
    };

    useEffect(() => {
        document.body.className =
            theme === 'dark'
                ? styles['dark-mode']
                : styles['light-mode']
            ;

        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            'useTheme must be used within a ThemeProvider'
        );
    }

    return context;
};