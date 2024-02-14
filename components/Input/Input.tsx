interface InputTypeProp {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    value: string;
    isinvalid: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputTypeProp> = ({...props}) => {    
    return (
    <div>
        <label className="text-slate-50 font-semibold sr-only">{props.label}</label>
        <input
            className={`w-full
                        pl-4
                        py-2
                        rounded-md
                        border-2
                        border-slate-500
                        focus:border-slate-300
                        focus:outline-none
                        `}
            {...props}
        />
        { props.isinvalid &&
            <span className="text-rose-500 mt-2 block">Input field must not be empty</span>
        }
    </div>
    );
}   

export default Input;   