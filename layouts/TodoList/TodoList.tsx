import Button from "@/components/Button";
import Th from "@/components/Th";

import { ths } from "@/libs/th";

interface TodoListPropType {
    todos: string[];
}

const TodoList: React.FC<TodoListPropType> = ({todos}) => {
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
            <tr>
                <th scope="row">Assignment</th>
                <td>Complete Math assignment</td>
                <td>Yes</td>
                <td>2023-09-14</td>
                <td>2024-02-08</td>
                <td className="flex items-center h-20 gap-2">
                    <Button title={"Edit"} type={"button"} variant={"Edit"}/>
                    <Button title={"Delete"} type={"button"} variant={"Delete"}/>
                </td>
            </tr>
           </tbody>
        </table>
    );
};

export default TodoList;