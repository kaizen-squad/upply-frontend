import type { ButtonHTMLAttributes, InputHTMLAttributes } from "react"

export type ITextFieldProps = {
    type?: string,
    label?: string, 
    className?: string,
    placeholder: string, 
    errorMessage?: string,
<<<<<<< HEAD
    Eposition?: 'top' | 'bottom',
=======
>>>>>>> 5417da9 (Integrated the global components and the ui for the register page)
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>,
    value?: string | number,
    onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void
} & InputHTMLAttributes<HTMLInputElement>

export type IButtonProps = {
    type?: 'button' | 'submit',
    textContent: string,
    className?: string,
    Icon?: React.FC<React.SVGProps<SVGSVGElement>> | string,
<<<<<<< HEAD
    Iposition?: 'left' | 'right'
=======
>>>>>>> 5417da9 (Integrated the global components and the ui for the register page)
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
} & ButtonHTMLAttributes<HTMLButtonElement>
