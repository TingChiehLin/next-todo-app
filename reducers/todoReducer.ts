import Todo from "@/models/Todo.model"

export type TodoItem = {
    id: number,
    name: string,
    description: string,
    is_completed: boolean,
    created_at: string,
    updated_at: string
}

type UpdatedToto = {
    id: number,
    name: string,
    description: string,
    updated_at: string
}

 export type Todostate = {
    todos: Todo[]
}

type InitialTodoAction = {
    type: "INITIAL_TODO",
    payload: Todo[]
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
    payload: UpdatedToto
}

type COMPLETED_TODO = {
    type: "COMPLETED_TODO",
    payload: number
}

type TodoAction = InitialTodoAction | AddTodoAction | RemoveTodoAction | UpdateTodoAction | COMPLETED_TODO;

export const todoReducer = (state: Todostate, action: TodoAction):Todostate => {
    const {type, payload} = action;

    if(type === "INITIAL_TODO") {
        return {
            ...state,
            todos:payload
        }
    }

    if(type === "ADD_TODO") {
        return {
            ...state,
            todos: [...state.todos, payload]
        }
    }

    if(type === "REMOVE_TODO") {
        const filteredTodos = state.todos.filter((todo) => todo.id != payload)
        return {
            ...state,
            todos: filteredTodos
        }
    }

    if(type === "UPDATE_TODO") {
        const updatedTodo = state.todos.map((todo) => {
            if(todo.id === payload.id) {
                return {
                    ...todo,
                    name: payload.name,
                    description: payload.description,
                    updated_at: payload.updated_at
                }
            }
            return todo;
        })
        return {
            ...state,
            todos: updatedTodo
        }
    }

    if(type === "COMPLETED_TODO") {
        const completedTodo = state.todos.map((todo) => {
            if(todo.id === payload) {
                return {
                    ...todo,
                    is_completed: !todo.is_completed
                }
            }
            return todo;
        })
        return {
            ...state,
            todos: completedTodo
        }
    }

    return state;
}

