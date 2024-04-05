import { ComponentProps } from "react";

import { twMerge } from 'tailwind-merge'

interface NavLinkProps extends ComponentProps<'a'> {
    className?: string;
}

export function NavLink({ className, children, ...props }: NavLinkProps) {
    return (
        <a {...props} className={twMerge('font-medium text-sm', className)}>
            { children }
        </a>
    );
}