const URL = "https://wayi.league-funny.com/api";

export const getTodos = async () => {
    const response = await fetch(URL + "/task", {
        method: "GET",
        headers : {
            "Content-Type": "application/json",
        }
    });
    if(!response.ok) {
        throw new Error("Failed to fetch todos");
    }
    const result = await response.json();
    return result.data;
}


