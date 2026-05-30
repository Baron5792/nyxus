interface InputProps {
    type: string;
    className?: string;
    placeholder?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: any;
    name: string;
    readOnly?: boolean
}

export const Input = ({ type, className, placeholder, onChange, value, name, readOnly }: InputProps) => {
    return (
        <>
            <input type={type} className={`${className} shadow-none border-success px-3`} readOnly={readOnly || false} name={name} value={value} style={{ fontFamily: 'sans-serif' }} placeholder={placeholder} onChange={onChange} />
        </>
    )
}