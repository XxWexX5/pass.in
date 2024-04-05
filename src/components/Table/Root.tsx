import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface RootProps extends ComponentProps<'table'> {}

export function Root({ className, ...props}: RootProps) {
    return (
        <table {...props} className={twMerge('w-full', className)} />
    )
}