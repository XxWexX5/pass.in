import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface CellProps extends ComponentProps<'td'> {}

export function Cell({ className, children, ...props }: CellProps) {
    return (
        <td 
            { ...props } 
            className={ twMerge('py-3 px-4 text-sm text-zinc-300', className) }
        >
            { children }
        </td>
    );
}