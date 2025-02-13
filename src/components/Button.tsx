interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = 'button',
    className = "",
    variant = 'primary'
}) => {
    const variantClasses = {
        primary: "bg-customColor font-bold py-1  rounded",
        secondary: "bg-navColor font-bold p-2 rounded text-white w-[100px]",
        danger: "bg-red-500 text-white"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`p-3 ${variantClasses[variant]} ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;