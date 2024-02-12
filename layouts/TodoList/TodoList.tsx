import * as React from 'react';

import TR from "@/components/TR";
import Th from "@/components/Th";

import { ths } from "@/libs/th";
import Todo from "@/models/Todo.model";

interface TodoListPropType {
    todos: Todo[];
}

const TodoList: React.FC<TodoListPropType> = ({todos}) => {

    const handleEditTodo = (index: number) => {
        console.log("Edit", index);
    }

    const handleDeleteTodo = (index: number) => {
        console.log("Delete", index);
    }
    return (
        <table className="w-full max-w-7xl text-left whitespace-nowrap">
            <colgroup>
                <col className="w-8/12 lg:w-2/12"/>
                <col className="w-3/12 lg:w-4/12" />
                <col className="w-4/12 md:w-4/12 lg:w-2/12"/>
                <col className="lg:w-2/12" />
                <col className="lg:w-2/12" />
            </colgroup>
            <thead>
               <tr>
                {ths.map((th, index) => <Th key={index + "_" + th} text={th.text}/>)}
               </tr>
           </thead>
           <tbody>
            {
                todos.map((todo)=>  
                <TR 
                    key={todo.id}
                    name={todo.name} 
                    description={todo.description} 
                    is_completed={todo.is_completed}
                    created_at={todo.created_at}
                    updated_at={todo.updated_at}
                    onEdit={() => handleEditTodo}
                    onDelete={() => handleDeleteTodo}
                />)
            }
           </tbody>
        </table>
    );
};

export default TodoList;