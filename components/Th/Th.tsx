interface ThTypeProp {
    order: number,
    text: string;
}

const Th:React.FC<ThTypeProp> = ({...props}) => {  
    console.log(props.order); 
    return (
        <th scope="col" 
            className={`${(props.order >= 1 && props.order < 5) && `hidden md:table-cell`} 
                          text-xl text-cyan-900 
                          font-semibold uppercase py-6
                          pl-6 md:pl-0
                      `}>
            {props.text}
        </th>
    );
}

export default Th;