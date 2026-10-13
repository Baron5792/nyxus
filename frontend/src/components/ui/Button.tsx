interface ButtonProps {
    type?: "button" | "submit" | "reset";
    className: string;
    title: any;
    onClick?: () => void;
}

export const AppButton = ({ type, className, title, onClick }: ButtonProps) => {
    return (
        <>
            <button type={type} className={className} onClick={onClick} style={{ fontFamily: 'sans-serif', fontSize: '13px', padding: '4px 10px' }}>
                {title}
            </button>
        </>
    )
}