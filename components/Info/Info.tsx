import * as React from "react";

import H1 from "../H1";
import Input from "../Input";
import Button from "../Button";

interface InfoCardTypeProp {
    reference: React.RefObject<HTMLDivElement>;
    onClose: () => void;    
}

const Info:React.FC<InfoCardTypeProp> = ({...props}) => {
    const [isDisabled, setIsDisabled] = React.useState(true);
    const {reference, onClose} = props;

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
                       placeholder={"Please xInput Title"} 
                       value={""} 
                       onChange={() => {}}
                />
                 <Input label={"Description"} 
                        type={"text"} 
                        placeholder={"Please Input Description"} 
                        value={""} 
                        onChange={() => {}}
                />
                <div className="flex justify-end gap-3">
                    <Button title={"Cancel"} type={"button"} variant={"Cancel"} onClick={onClose} disabled={isDisabled}/>
                    <Button title={"Add"} type={"button"} variant={"Add"} disabled={isDisabled}/>
                </div>
            </div>
          </div>
    );
}

export default Info;