import React, { useState } from "react";

const __TAILWIND_CSS = {
    root: "bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 my-2.5",
    button: "inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
    dropdown: "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none",

}

export interface DropdownOption<T> {
    item: T
    name: string
}

interface DropdownProps<T> {
    dropdownOptions: DropdownOption<T>[];
    closeOnSelect: boolean;
    onSelect: (option: T) => void;
}

export const Dropdown = <T,>({
    dropdownOptions,
    closeOnSelect,
    onSelect
}: DropdownProps<T>) => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div className="relative inline-block text-left">
            <div
                className={__TAILWIND_CSS.button}
                onClick={() => setVisible(!visible)}
            >
                button
            </div>
            {visible ? (
                <div className={__TAILWIND_CSS.dropdown}>
                    {dropdownOptions.map((option) => {
                        return (
                            <div onClick={() => onSelect(option.item)}>
                                {option.name}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};
