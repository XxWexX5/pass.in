import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface HeaderProps extends ComponentProps<'th'> {}

export function Header({children, className, ...props}: HeaderProps) {
    return (
        <th 
            {...props}  
            className={twMerge('py-3 px-4 text-sm font-semibold text-left', className)}
        >
            { children }
        </th>
    );
}