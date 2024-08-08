import clsx from "clsx";
import { FC } from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    wrapperClassName?: string;
}

const Card: FC<CardProps> = ({ children, className, wrapperClassName }) => {
    return <div className={clsx("bg-gradient-to-b from-[#eeffff] to-[#444751] rounded-3xl p-[2px] w-full max-w-3xl", wrapperClassName)}>
        <div className={clsx("w-full bg-gradient-to-b from-[#647b86] to-[#1d1c21] rounded-3xl grid place-items-center h-24 border-y-2 border-t-[#465d69] border-b-[#05060f]", className)}>
            {children}
        </div>
    </div>;
};

export default Card;
