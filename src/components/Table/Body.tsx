import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface BodyProps extends ComponentProps<'tbody'> {}

export function Body({ className, ...props }: BodyProps) {
    return (
        <tbody { ...props } className={twMerge('', className)} />
    );
}