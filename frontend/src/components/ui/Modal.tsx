import type React from "react";
import type { ReactNode } from "react"
import css from '../../assets/css/CustomModal.module.css';
import { X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { Modal } from "react-bootstrap";

type Props = {
    children: ReactNode;
    onClick?: boolean
    onHide?: () => void;
    title: string;
}

export const CustomModal:React.FC<Props> = ({ children, onClick, onHide, title }) => {
    const { theme } = useTheme();
    return (
        <>
            <Modal centered fullscreen='sm-down' show={onClick} onHide={onHide} className={theme === 'dark' ? css['dark-modal'] : css['light-modal']}>
                <Modal.Body>
                    <div className="d-flex align-items-center justify-content-between">
                        <p style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '18px' }} className="m-0">{title}</p>
                        <button type="button" className={`btn btn-normal p-1 bg-${theme === 'dark' ? 'secondary' : 'light'} rounded-circle m-0`} onClick={onHide}>
                            <X strokeWidth={1} size={24} />
                        </button>
                    </div>
                    <div className="my-5">
                        {children}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}