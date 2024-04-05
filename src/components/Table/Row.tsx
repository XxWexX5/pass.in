import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface RowProps extends ComponentProps<'tr'> {}

export function Row({ className, ...props }: RowProps) {
    return (
        <tr {...props} className={twMerge('', className)} />
    );
}