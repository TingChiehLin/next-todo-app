interface ModalTypeProp {
    isOpen: boolean;
    children: React.ReactNode;
}

const Modal: React.FC<ModalTypeProp>= ({isOpen, children}) => {
    return (
        <>
            <div className={`fixed 
                            inset-0
                            bg-slate-900 
                            bg-opacity-100 
                            ${isOpen && "opacity-60"}
                            z-10 
            `}>
            </div>
            {children}
         </>
    )
}

export default Modal;