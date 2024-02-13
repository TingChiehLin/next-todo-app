import * as React from "react";

import H1 from "../H1";
import Input from "../Input";
import Button from "../Button";

import { TodoContext } from "@/store/todo-context";

interface InfoCardTypeProp {
    reference: React.RefObject<HTMLDivElement>;
    onClose: () => void;    
}

const Info:React.FC<InfoCardTypeProp> = ({...props}) => {
    const {addTodo} = React.useContext(TodoContext);
    const [values, setValues] = React.useState({
        title: {
            value: "",
            isInvalid: false
        },
        description: {
            value: "",
            isInvalid: false
        },
    })

    const {reference, onClose} = props;
    const isDisable = values["title"].value === "" 
                      || values["description"].value === "" 
                      || values["title"].isInvalid 
                      || values["description"].isInvalid;

    const handleAddTodo = (title: string, description: string) => {
        if(title === "" || description === "") {
            setValues({
                ...values,
                title: {
                    value: title,
                    isInvalid: title === "" ? true : false
                },
                description: {
                    value: description,
                    isInvalid: description === "" ? true : false
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
                isInvalid: value === "" ? true : false
            }
        })
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
            <H1 title={"Add Todo"} alignContent={"center"} className="mb-12"/>
            <div className="w-full flex flex-col gap-8">
                <Input label={"Name"} 
                       type={"text"} 
                       name={"title"}
                       placeholder={"Please Input Title"} 
                       value={values["title"].value} 
                       isInvalid={values["title"].isInvalid}
                       onChange={handleChange}
                />
                 <Input label={"Description"} 
                        type={"text"} 
                        name={"description"}
                        placeholder={"Please Input Description"} 
                        value={values["description"].value} 
                        isInvalid={values["description"].isInvalid}
                        onChange={handleChange}
                />
                <div className="flex justify-end gap-3">
                    <Button title={"Close"} type={"button"} 
                            variant={"Close"} 
                            onClick={onClose} 
                    />
                    <Button title={"Add"} 
                            type={"button"} 
                            variant={"Add"} 
                            disabled={isDisable}
                            onClick={() => handleAddTodo(values["title"].value, values["description"].value)}
                    />
                </div>
            </div>
          </div>
    );
}

export default Info;