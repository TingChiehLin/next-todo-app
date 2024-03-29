'use client'

import * as React from 'react';

import {Todostate, todoReducer } from "@/reducers/todoReducer";

import { getTodos, addTodos, removeTodos, updateTodos, completedTodos} from '@/libs/actions';

interface TodoProviderTypeProp {
    children: React.ReactNode;
}

type TodoContextType = Todostate & {
    addTodo: (id: number, name: string, description: string, created_at: string ,updated_at: string) => void,
    deleteTodo: (index: number) => void,
    updatedTodo: (id: number, name: string, description: string, updated_at: string) => void,
    completedTodo: (id: number) => void
}

const initialCtx = {
    todos: [],
    addTodo: (id: number ,name: string,created_at: string ,updated_at: string) => {},
    deleteTodo: (id: number) => {},
    updatedTodo: (id: number, name: string, description: string, updatedDate: string) => {},
    completedTodo: (id: number) => {}  
}


export const TodoContext = React.createContext<TodoContextType>(initialCtx);

export const TodoProvider: React.FC<TodoProviderTypeProp> = ({children}) => {
    const [todoState, todoDispatch] = React.useReducer(todoReducer, {
        todos: []
    })

    React.useEffect(() => {
        handleInitialTodo()
    },[])

    const handleInitialTodo = async () => {
        const todos = await getTodos();
        todoDispatch({
            type: "INITIAL_TODO",
            payload: todos
        })
    }

    const handleAddTodo = async (id: number, name: string, description: string) => {
        const newTodo = await addTodos({
            id: id,
            name: name,
            description: description,
            is_completed: false,
            created_at: new Date().toLocaleDateString(),
            updated_at: new Date().toLocaleDateString(),
        });

        todoDispatch({
            type: "ADD_TODO",
            payload: newTodo
        })
    }

    const handleRemoveTodo = (id: number) => {
        removeTodos(id);
        todoDispatch({
            type: "REMOVE_TODO",
            payload: id
        })
    }

    const handleUpdatedTodo = (id: number, name: string, description: string, updated_at: string) => {
        updateTodos(id);
        todoDispatch({
            type: "UPDATE_TODO",
            payload: {
                id: id,
                name: name,
                description: description,
                updated_at: updated_at
            }
        })
    }

    const handleCompletedTodo = (id: number) => {   
        completedTodos(id);
        todoDispatch({
            type: "COMPLETED_TODO",
            payload: id
        })
    }

    const ctxValue = {
        todos: todoState.todos,
        addTodo: handleAddTodo,
        deleteTodo:handleRemoveTodo,
        updatedTodo: handleUpdatedTodo,
        completedTodo: handleCompletedTodo
    }

    return (
        <TodoContext.Provider value={ctxValue}>
            {children}
        </TodoContext.Provider>
    );
}