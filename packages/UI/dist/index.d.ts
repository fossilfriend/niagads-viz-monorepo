import React, { ReactNode } from 'react';

type ButtonVariants = 'default' | 'primary' | 'secondary' | 'white' | 'accent';
type ButtonSizes = 'sm' | 'md' | 'lg';
interface Button {
    variant?: ButtonVariants;
    size?: ButtonSizes;
    children: ReactNode | string;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | null;
}
declare const Button: ({ variant, size, children, onClick, disabled }: Button) => React.JSX.Element;

declare const CHECKBOX_TAILWIND_CSS: {
    root: string;
    default: string;
    primary: string;
    secondary: string;
    accent: string;
    pink: string;
    alignCenter: string;
};
type CheckboxVariants = 'default' | 'primary' | 'secondary' | 'pink' | 'accent';
interface CheckboxProps {
    variant?: CheckboxVariants;
    name: string;
    label?: string;
    checked?: boolean;
    value?: string;
    defaultChecked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | null;
    disabled?: boolean;
    alignCenter?: boolean;
}
declare const Checkbox: ({ variant, name, value, label, onChange, disabled, checked, defaultChecked, alignCenter }: CheckboxProps) => React.JSX.Element;

interface HelpIcon {
    message: ReactNode | string;
    type: 'question' | 'info';
}
declare const HelpIcon: ({ message, type }: HelpIcon) => React.JSX.Element;
declare const renderHelpIcon: (message: ReactNode | string, type?: 'question' | 'info') => React.JSX.Element;

declare const RadioButton: ({ variant, label, onChange, disabled, checked, alignCenter }: CheckboxProps) => React.JSX.Element;

interface SearchInput {
    onChange: (val: string) => void;
    value: string;
}
declare const SearchInput: ({ onChange, value }: SearchInput) => React.JSX.Element;

interface Select {
    fields: string[] | {
        [key: string]: string;
    } | number[];
    id: string;
    name?: string;
    label?: string;
    defaultValue?: string;
    inline?: boolean;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    variant?: 'outline' | 'underline' | 'plain';
}
declare const Select: ({ fields, id, label, name, defaultValue, inline, onChange, variant }: Select) => React.JSX.Element;

interface Tooltip {
    message: string | ReactNode;
    children: string | ReactNode;
}
declare function Tooltip({ message, children }: Tooltip): React.JSX.Element;
declare const renderTooltip: (children: any, message: any) => React.JSX.Element;

export { Button, CHECKBOX_TAILWIND_CSS, Checkbox, type CheckboxProps, type CheckboxVariants, HelpIcon, RadioButton, SearchInput, Select, Tooltip, renderHelpIcon, renderTooltip };
