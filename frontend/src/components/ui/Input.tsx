import { useTheme } from "../../context/ThemeContext";

interface InputProps {
    type: string;
    className?: string;
    placeholder?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value?: any;
    name: string;
    readOnly?: boolean
}

export const Input = ({ type, className, placeholder, onChange, value, name, readOnly }: InputProps) => {
    // const { theme } = useTheme();
    return (
        <>
            <input type={type} className={`${className} bg-light shadow-none border-secondary px-3`} readOnly={readOnly || false} name={name} value={value} style={{ fontFamily: 'sans-serif', fontSize: '14px' }} placeholder={placeholder} onChange={onChange} />
        </>
    )
}