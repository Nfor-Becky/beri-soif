interface CommentProps {
    children: React.ReactNode;
    className?: string;
    name?: string;
}

const Comment: React.FC<CommentProps> = ({
    children,
    name="",
    className = ""
}) => {
 
    return (
        <p
           
            className={`p-3 bg-navColor m-auto my-2 w-[15rem] text-white rounded-md`}
        >   <h3>{name}</h3>
            {children}
        </p>
    );
}

export default Comment;