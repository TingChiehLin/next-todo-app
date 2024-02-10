

interface RootContainerTypeProp {
    children: React.ReactNode;
}

const RootContainer: React.FC<RootContainerTypeProp> = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default RootContainer;