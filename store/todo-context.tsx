'use client'

import Todo from '@/models/Todo.model';
import * as React from 'react';

interface TodoProviderTypeProp {
    children: React.ReactNode;
}

type TodoItem = {
    id: number,
    name: string,
    description: string
}

type Todostate = {
    todos: Todo[]
}

type TodoContextType = Todostate & {
    addTodo: (id: number, name: string, description: string) => void,
    removeTodo: (index: number) => void,
}

type AddTodoAction = {
    type: "ADD_TODO",
    payload: TodoItem
}

type RemoveTodoAction = {
    type: "REMOVE_TODO",
    payload: number
}

type UpdateTodoAction = {
    type: "UPDATE_TODO",
    payload: TodoItem
}

type TodoAction = AddTodoAction | RemoveTodoAction | UpdateTodoAction;

const testData: Todo[] = [{
    id: 0,
    name: "Assignment", 
    description: "description",
    is_completed: false, 
    created_at: "08/08/2021", 
    updated_at: "08/06/2022",
}];

const todoReducer = (state: Todostate, action: TodoAction):Todostate => {
    const {type, payload} = action;

    if(type === "ADD_TODO") {
        const newTodo:Todo = {
            id: payload.id,
            name: payload.name,
            description: payload.description,
            is_completed: false,
            created_at: "08/08/2021",
            updated_at: "08/06/2022"
        }
        return {
            ...state,
            todos: [...state.todos, newTodo]
        }
    }

    return state;
}

const initialCtx = {
    todos: [],
    addTodo: (id: number ,name: string, description: string) => {},
    removeTodo: (index: number) => {},
}

const initialState: Todostate =  {
    todos: testData
}

export const TodoContext = React.createContext<TodoContextType>(initialCtx);

export const TodoProvider: React.FC<TodoProviderTypeProp> = ({children}) => {
    const [todoState, todoDispatch] = React.useReducer(todoReducer,initialState)

    const handleAddTodo = (id: number, name: string, description: string) => {
        todoDispatch({
            type: "ADD_TODO",
            payload: {
                id: id,
                name: name,
                description: description,
            }
        })
    }

    const handleRemoveTodo = (index: number) => {

    }

    const ctxValue = {
        todos: todoState.todos,
        addTodo: handleAddTodo,
        removeTodo:handleRemoveTodo,
    }

    return (
        <TodoContext.Provider value={ctxValue}>
            {children}
        </TodoContext.Provider>
    );
}