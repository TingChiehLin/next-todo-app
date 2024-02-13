"use client";

export type Buttons = "Add" | "Edit" | "Close" | "Delete";

interface ButtonTypeProp {
    title: string;
    variant: Buttons;
    type: "button" | "submit" | "reset";
    icon?: React.ReactNode;
    disabled?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
}

const buttonMapper: {[k in Buttons]: string} = {
    "Add": "bg-cyan-400",
    "Edit": "bg-cyan-400",
    "Close": "bg-rose-600",
    "Delete": "bg-rose-600",
};

const hoverMapper: {[k in Buttons] : string} = {
    "Add": "hover:bg-cyan-300 hover:text-cyan-900",
    "Edit": "hover:bg-cyan-300 hover:text-cyan-900",
    "Close" : "hover:bg-rose-500 hover:text-rose-900",
    "Delete": "hover:bg-rose-500 hover:text-rose-900",
};

const Button: React.FC<ButtonTypeProp> = ({ children, ...props }) => {

    return (
        <button
            className={`text-slate-50 py-2 px-4 rounded-md
                        ${buttonMapper[props.variant]}
                        ${hoverMapper[props.variant]}
                        focus:outline-none
                        disabled:bg-slate-300
                        disabled:text-slate-500
                      `}
            {...props}
            >
            <span className="font-bold">{props.title}</span>
            {children}
        </button>
    );
};

export default Button;