import * as React from 'react';

import { ModalState, initialModalState, modalReducer } from '@/reducers/modalReducer';

interface ModalProviderPropType {
    children: React.ReactNode;
}

type ModalContextType = ModalState & {
    openModal: () => void;
    closeModal: () => void;
}

const initialCtx = {
    isModalOpen: false,
    modalType: "",
    modalTitle: "",
    openModal: () => {},
    closeModal: () => {}
}

export const ModalContext = React.createContext<ModalContextType>(initialCtx);

export const ModalProvider: React.FC<ModalProviderPropType> = ({children}) => {
    const [modalState, modalDispatch] = React.useReducer(modalReducer, initialModalState);


    const ctxValue = {
        ...modalState,
        openModal,
        closeModal
    }

    return (
        <ModalContext.Provider value={ctxValue}>
            {children}
        </ModalContext.Provider>
    );
}