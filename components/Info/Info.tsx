import * as React from "react";

import H1 from "../H1";
import Input from "../Input";
import Button from "../Button";

import { TodoContext } from "@/store/todo-context";

interface InfoCardTypeProp {
    infoTitle: string;
    reference: React.RefObject<HTMLDivElement>;
    onEdit?: (name: string, description: string) => void;
    onClose: () => void;    
}

const Info:React.FC<InfoCardTypeProp> = ({...props}) => {
    const {addTodo} = React.useContext(TodoContext);
    const [values, setValues] = React.useState({
        title: {
            value: "",
            isinvalid: false
        },
        description: {
            value: "",
            isinvalid: false
        },
    })

    const {infoTitle, reference, onEdit, onClose} = props;
    const isDisable = values["title"].value === "" 
                      || values["description"].value === "" 
                      || values["title"].isinvalid 
                      || values["description"].isinvalid;

    const handleAddTodo = (title: string, description: string) => {
        if(title === "" || description === "") {
            setValues({
                ...values,
                title: {
                    value: title,
                    isinvalid: title === "" ? true : false
                },
                description: {
                    value: description,
                    isinvalid: description === "" ? true : false
                }
            })
            return;
        }
        addTodo(Math.random(), title, description, new Date().toLocaleDateString(), new Date().toLocaleDateString());
        onClose();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setValues({
            ...values,
            [event.target.name]: {
                value: value,
                isinvalid: value === "" ? true : false
            }
        })
    }

    const handleEdit = (name: string, description: string) => {
        if (onEdit) {
            onEdit(name, description);
            onClose();
        }
        return 
    }

    return (
            <div className="w-full max-w-md md:max-w-lg lg:max-w-xl
                p-12
                rounded-md
                shadow-md
              bg-slate-50
                fixed 
                top-1/2
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                z-30
                "
                ref={reference}
            >
            <H1 title={infoTitle} alignContent={"center"} className="mb-12"/>
            <div className="w-full flex flex-col gap-8">
                <Input label={"Name"} 
                       type={"text"} 
                       name={"title"}
                       placeholder={"Please Input Title"} 
                       value={values["title"].value} 
                       isinvalid={values["title"].isinvalid}
                       onChange={handleChange}
                />
                 <Input label={"Description"} 
                        type={"text"} 
                        name={"description"}
                        placeholder={"Please Input Description"} 
                        value={values["description"].value} 
                        isinvalid={values["description"].isinvalid}
                        onChange={handleChange}
                />
                <div className="flex justify-end gap-3">
                    <Button title={"Close"} type={"button"} 
                            variant={"Close"} 
                            onClick={onClose} 
                    />
                    {infoTitle === "Add Todo" &&
                        <Button title={"Add"} 
                            type={"button"} 
                            variant={"Add"} 
                            disabled={isDisable}
                            onClick={() => handleAddTodo(values["title"].value, values["description"].value)}
                    />}
                    {infoTitle === "Edit Todo" &&
                        <Button title={"Edit"} 
                            type={"button"} 
                            variant={"Edit"} 
                            disabled={isDisable}
                            onClick={() => handleEdit(values["title"].value, values["description"].value)}
                    />}

                </div>
            </div>
          </div>
    );
}

export default Info;