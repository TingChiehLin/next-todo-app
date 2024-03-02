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
        throw new Error("Failed to fetch todos");
    }

    const newTodo = await response.json();
    return newTodo.data;
}


