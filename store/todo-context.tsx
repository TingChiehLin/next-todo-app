'use client'

import * as React from 'react';

interface TodoProviderTypeProp {
    children: React.ReactNode;
}

const initialData = {
    todos: ['Learn React', 'Learn TypeScript'],
    addTodo: (todo: string) => {},
    removeTodo: (index: number) => {}
}

export const TodoContext = React.createContext(initialData);

export const TodoProvider: React.FC<TodoProviderTypeProp> = ({children}) => {
    return (
        <TodoContext.Provider value={initialData}>
            {children}
        </TodoContext.Provider>
    );
}