interface IconType {
    icon: any,
    className: any,
    BackgroundColor: string,
    iconColor: string,
}

export const CustomIcons = ({ icon, className, BackgroundColor, iconColor }: IconType) => {
    return (
        <>
            <div>
                <p className={`${className} p-2`} style={{ backgroundColor: BackgroundColor, color: iconColor }}>
                    {icon}
                </p>
            </div>
        </>
    )
}