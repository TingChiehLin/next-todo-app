'use client'

import * as React from 'react';

import {Todostate, todoReducer } from "@/reducers/todoReducer";

import { getTodos } from '@/libs/actions';

interface TodoProviderTypeProp {
    children: React.ReactNode;
}

type TodoContextType = Todostate & {
    addTodo: (id: number, name: string, description: string, created_at: string ,updated_at: string) => void,
    deleteTodo: (index: number) => void,
    updatedTodo: (id: number, name: string, description: string, updated_at: string) => void,
}

const initialCtx = {
    todos: [],
    addTodo: (id: number ,name: string,created_at: string ,updated_at: string) => {},
    deleteTodo: (id: number) => {},
    updatedTodo: (id: number, name: string, description: string, updatedDate: string) => {},
}

const initialState: Todostate = {
    todos: [],
}

export const TodoContext = React.createContext<TodoContextType>(initialCtx);

export const TodoProvider: React.FC<TodoProviderTypeProp> = ({children}) => {
    const [todoState, todoDispatch] = React.useReducer(todoReducer, initialState)

    const handleAddTodo = (id: number, name: string, description: string) => {
        todoDispatch({
            type: "ADD_TODO",
            payload: {
                id: id,
                name: name,
                description: description,
                created_at: new Date().toLocaleDateString(),
                updated_at: new Date().toLocaleDateString()
            }
        })
    }

    const handleRemoveTodo = (id: number) => {
        todoDispatch({
            type: "REMOVE_TODO",
            payload: id
        })
    }

    const handleUpdatedTodo = (id: number, name: string, description: string, updated_at: string) => {
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

    const ctxValue = {
        todos: todoState.todos,
        addTodo: handleAddTodo,
        deleteTodo:handleRemoveTodo,
        updatedTodo: handleUpdatedTodo,
    }

    return (
        <TodoContext.Provider value={ctxValue}>
            {children}
        </TodoContext.Provider>
    );
}