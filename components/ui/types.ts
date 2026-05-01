import type { ButtonHTMLAttributes, FC, InputHTMLAttributes, JSX, ReactElement, ReactNode } from "react"

export type ITextFieldProps = {
    type?: string,
    label?: string, 
    className?: string,
    placeholder: string, 
    errorMessage?: string,
    Eposition?: 'top' | 'bottom',
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>,
    value?: string | number,
    onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void
} & InputHTMLAttributes<HTMLInputElement>

export type IButtonProps = {
    type?: 'button' | 'submit',
    textContent: string,
    className?: string,
    isLoading?: boolean,
    Icon?: React.FC<React.SVGProps<SVGSVGElement>> | string | React.FC<React.HTMLProps<HTMLElement>> | undefined,
    Iposition?: 'left' | 'right'
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
} & ButtonHTMLAttributes<HTMLButtonElement>
