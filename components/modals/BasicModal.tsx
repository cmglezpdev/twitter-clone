import { ReactNode, FC, useRef, MouseEvent } from 'react';

interface Props {
    open: boolean;
    closeModal: () => void;

    className?: string;
    children: ReactNode;
}

export const BasicModal:FC<Props> = ({ open, closeModal, children, className = '' }) => {
    
    const bgModal = useRef<HTMLDivElement>(null);
    if (!open) return null;

    const handleModal = ( e:MouseEvent<HTMLDivElement> ) => {
        if( bgModal.current === e.target ) closeModal()
    }

    return (
        <div ref={bgModal} className={className} onClick={(e) => handleModal(e)}>
            { children }
        </div>
    )
}
