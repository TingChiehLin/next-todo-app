interface ThTypeProp {
    text: string;
}

const Th:React.FC<ThTypeProp> = ({...props}) => {   
    return (
        <th scope="col" className="text-xl text-cyan-900 font-semibold uppercase">{props.text}</th>
    );
}

export default Th;