import type { ButtonHTMLAttributes, InputHTMLAttributes } from "react"

export type ITextFieldProps = {
    type?: string,
    label?: string, 
    className?: string,
    placeholder: string, 
    errorMessage?: string,
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>,
    value?: string | number,
    onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void
} & InputHTMLAttributes<HTMLInputElement>

export type IButtonProps = {
    type?: 'button' | 'submit',
    textContent: string,
    className?: string,
    Icon?: React.FC<React.SVGProps<SVGSVGElement>> | string,
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
} & ButtonHTMLAttributes<HTMLButtonElement>
