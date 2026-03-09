import { ReactNode, useEffect, useRef, MouseEvent, CSSProperties } from 'react';

type modalProps = {
    open: boolean;
	onClose?: () => void;
    children: ReactNode;
}

export function Modal({ open, onClose, children }: modalProps) {
    //bg
    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors z-100000000 ${open ? "visible bg-black/20" : "invisible"}`}>
            <div onClick={(e) => e.stopPropagation()} className="modalChildren">
                {children}
                <button onClick={onClose} className="close-button"><i className="fas fa-times"></i></button>
            </div>
        </div>
    )
}