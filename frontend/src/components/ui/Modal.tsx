import type React from "react";
import type { ReactNode } from "react"
import css from '../../assets/css/CustomModal.module.css';
import { X } from "lucide-react";

type Props = {
    children: ReactNode;
    onClick?: boolean
    onHide?: () => void;
    title: string;
}

export const CustomModal:React.FC<Props> = ({ children, onClick, onHide, title }) => {
    return (
        <>
            <div className={`${css['modal']}`} style={{ display: onClick ? 'block' : 'none' }}>
                <div className={css['modal_container']}>
                    <div className="d-flex align-items-center justify-content-between">
                        <p style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '16px' }} className="m-0">{title}</p>
                        <button type="button" className="btn btn-normal p-1 bg-light rounded-circle m-0" onClick={onHide}>
                            <X strokeWidth={1} size={24} />
                        </button>
                    </div>
                    <div className="mt-3">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}