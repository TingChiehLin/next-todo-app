interface ModalTypeProp {
    isModalOpen: boolean;
    children: React.ReactNode;
}

const Modal: React.FC<ModalTypeProp>= ({isModalOpen, children}) => {
    return (
        <>
            <div className={`fixed 
                            inset-0
                            bg-slate-900 
                            bg-opacity-100 
                            ${isModalOpen && "opacity-60"}
                            z-10 
            `}>
            </div>
            {children}
         </>
    )
}

export default Modal;