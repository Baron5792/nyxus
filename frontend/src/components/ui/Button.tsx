interface ButtonProps {
    type?: "button" | "submit" | "reset";
    className: string;
    title: any;
    onClick?: () => void;
}

export const AppButton = ({ type, className, title, onClick }: ButtonProps) => {
    return (
        <>
            <button type={type} className={className} onClick={onClick} style={{ fontFamily: 'sans-serif', fontSize: '14px', padding: '7px 0px' }}>
                {title}
            </button>
        </>
    )
}