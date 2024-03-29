import Todo from "@/models/Todo.model";

const URL = "https://wayi.league-funny.com/api";

export const getTodos = async (): Promise<Todo[]> => {
    const response = await fetch(URL + "/task", {
        method: "GET",
        headers : {
            "Content-Type": "application/json",
        },
        cache: "no-store"
    });
    if(!response.ok) {
        throw new Error("Failed to fetch todos");
    }
    const result = await response.json();
    return result.data;
}

export const addTodos = async (todo: Todo): Promise<Todo> => {
    const response = await fetch(URL + "/task", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo)
    });

    if(!response.ok) {
        throw new Error("Failed to add todo");
    }

    const newTodo = await response.json();
    return newTodo.data;
}

export const removeTodos = async (id: number) => {
    try {
        await fetch(URL + `/task/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
    } catch(error) {
        throw new Error(`Faild to delete todo: ${error}`)
    }
}

export const updateTodos = async (id: number) => {
    try {
        const response = await fetch(URL + `/task/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const updatedTodo = await response.json();
        return updatedTodo.data;
    } catch(error) {
        throw new Error(`Faild to updated todo: ${error}`);
    }
}

export const completedTodos = async (id: number) => {
    try {
        await fetch(URL + `/task/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch(error) {
        throw new Error(`Faild to complete todo: ${error}`)
    }
}

