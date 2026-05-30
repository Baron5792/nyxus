import { NavLink } from "react-router-dom";

interface NavLinkProps {
    to: string;
    title: string;
    classname: string;
    style: React.CSSProperties;
}

export const LinkButtons = ({ to, title, classname, style }: NavLinkProps) => {
    return (
        <>
            <NavLink to={to} className={'text-decoration-none'}>
                <button className={classname} style={style}>
                    { title }
                </button>
            </NavLink>
        </>
    )
}