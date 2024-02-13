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
            <td>{description}</td>
            <td>{is_completed ? "YES" : "NO"}</td>
            <td>{created_at}</td>
            <td>{updated_at}</td>
            <td className="flex items-center py-6 gap-2">
                <Button title={"Edit"} type={"button"} variant={"Edit"} onClick={onEdit}/>
                <Button title={"Delete"} type={"button"} variant={"Delete"} onClick={onDelete}/>
            </td>
        </tr>
    );
}

export default TR;