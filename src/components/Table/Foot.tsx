import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface FootProps extends ComponentProps<'tfoot'> {}

export function Foot({ className, ...props }: FootProps) {
    return (
        <tfoot 
            { ...props } 
            className={twMerge('', className)} 
        />
    );
}