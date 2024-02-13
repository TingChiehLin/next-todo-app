export type ModalState = {
    title: string,
    type: string,
    isModalOpen: boolean,
}

type AddModalAction = {
    type: "ADD_TODO_MODAL",
    payload: ModalState,
}

type UpdateModalAction = {
    type: "UPDATE_TODO_MODAL",
    payload: ModalState,
}

type CloseModalAction = {
    type: "CLOSE_MODAL",
    payload: boolean,
}   

type ModalAction = AddModalAction | UpdateModalAction | CloseModalAction;

export const initialModalState: ModalState = {
    title: 'Add Todo',
    type: '',
    isModalOpen: false,
}

export const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
    const {type, payload} = action;
    
    if(type === "ADD_TODO_MODAL") {
        return {
            ...state,
            title: payload.title,
            type: payload.type,
            isModalOpen: payload.isModalOpen,
        }
    }

    if(type === "UPDATE_TODO_MODAL") {
        return {
            ...state,
            title: payload.title,
            type: payload.type,
            isModalOpen: payload.isModalOpen,
        }
    }

    if(type === "CLOSE_MODAL") {
        return {
            ...state,
            isModalOpen: payload,
        }
    }

    return state;    
}

