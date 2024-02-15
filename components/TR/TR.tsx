import * as React from 'react';
import Button from "../Button";

interface TRTypeProps {
    name: string;
    description: string;
    is_completed: boolean;
    created_at: string;
    updated_at: string;
    onEdit: () => void;
    onDelete: () => void;
}

const TR: React.FC<TRTypeProps> = ({...props}) => {
    const {name, description, is_completed, created_at, updated_at, onEdit, onDelete} = props;

    return (
        <tr className="py-6">
            <th scope="row">{name}</th>
            <td className={`hidden md:table-cell`}>{description}</td>
            <td className={`hidden md:table-cell`}>{is_completed ? "YES" : "NO"}</td>
            <td className={`hidden md:table-cell`}>{created_at}</td>
            <td className={`hidden md:table-cell`}>{updated_at}</td>
            <td className="flex items-center py-6 gap-2 flex-wrap md:flex-nowrap pl-6 md:pl-0">
                <Button title={"Complete"} type={"button"} variant={"Complete"} onClick={onEdit}/>
                <Button title={"Edit"} type={"button"} variant={"Edit"} onClick={onEdit}/>
                <Button title={"Delete"} type={"button"} variant={"Delete"} onClick={onDelete}/>
            </td>
        </tr>
    );
}

export default TR;