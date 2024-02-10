type alignments = 'center' | 'left' | 'right';

interface H1TypeProp {
    title: string;
    alignContent?: alignments;
    className?: string;
}

const alignContentMapper:{[k in alignments]: string} = {
    "center": 'text-center',
    "left": 'text-left',
    "right": 'text-right'
}

const H1: React.FC<H1TypeProp> = ({title, alignContent = "left", className}) => {
    return (
        <h1 className={`text-4xl font-bold text-rose-900 ${alignContentMapper[alignContent]} ${className}`}>{title}</h1>
    );
}

export default H1;