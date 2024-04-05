import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface HeadProps extends ComponentProps<'thead'> {}

export function Head({ className, ...props }: HeadProps) {
    return <thead { ...props } className={ twMerge('', className) } />
}