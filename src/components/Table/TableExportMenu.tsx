import React, { ReactNode } from "react"

interface ExportMenu {
    onSubmit: any
    table: any
}

// working from https://www.creative-tim.com/twcomponents/component/pure-css-dropdown-using-focus-within
// idea to create a drop down menu w/select which data and which format

export const TableExportMenu = ({ table, onSubmit }: ExportMenu) => {
    return <div className="flex items-center justify-center p-12">
        <div className="relative inline-block text-left dropdown">
            <span className="rounded-md shadow-sm">
                <button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                    type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
                    <span>Options</span>
                    <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </span>
            <div className="hidden dropdown-menu">
                <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                    <div className="px-4 py-3">
                        <p className="text-sm leading-5">Signed in as</p>
                        <p className="text-sm font-medium leading-5 text-gray-900 truncate">tom@example.com</p>
                    </div>
                    <div className="py-1">
                        <a href="javascript:void(0)" className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >Account settings</a>
                        <a href="javascript:void(0)" className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >Support</a>
                        <span role="menuitem" className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50" aria-disabled="true">New feature (soon)</span>
                        <a href="javascript:void(0)" className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >License</a></div>
                    <div className="py-1">
                        <a href="javascript:void(0)" className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >Sign out</a></div>
                </div>
            </div>
        </div>
    </div>

}