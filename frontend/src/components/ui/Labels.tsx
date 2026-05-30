interface LabelProps {
    htmlFor: string;
    title: string;
    required?: boolean;
}

export const Label = ({ htmlFor, title, required }: LabelProps) => {
    return (
        <>
            <label htmlFor={htmlFor} style={{ fontFamily: 'sans-serif', fontSize: '14px' }}>{title} {required && <span className="text-danger">*</span>}</label>
        </>
    )
}