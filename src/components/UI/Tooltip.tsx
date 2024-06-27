import React, { ReactNode } from "react"

// adapted from: 

const __TAILWIND_TOOLTIP = {
    root: "hidden absolute",
    format: "z-50 whitespace-nowrap rounded bg-black px-4 py-[6px] text-sm font-semibold text-white group-hover:block",
    top: "bottom-full left-1/2 mb-3 -translate-x-1/2",
    left: "right-full top-1/2 mr-3 -translate-y-1/2",
    right: "left-full top-1/2 ml-3 -translate-y-1/2",
    bottom: "left-1/2 top-full mt-3 -translate-x-1/2",
    triangle_top: "absolute bottom-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-black",
    triangle_bottom: "absolute left-1/2 top-[-3px] -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-black",
    triangle_left: "absolute right-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-black",
    triangle_right: "absolute left-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-black",
}


///const TAILWIND_TOOLTIP = "py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none mt-2 text-center"
//bg-blue-200 p-3 -mt-0 -ml-6 rounded hidden group-hover:block absolute text-center py-2 px-6 z-50&quot;
interface Tooltip {
    message: string | ReactNode,
    children: string | ReactNode
    position?: 'top' | 'bottom' | 'left' | 'right'
}

export const Tooltip = ({ children, message, position = 'bottom' }: Tooltip) => {
    const tooltipStyle = __TAILWIND_TOOLTIP['root'] + " " + __TAILWIND_TOOLTIP['format'] + " " + __TAILWIND_TOOLTIP[position]
    const triangleStyle = __TAILWIND_TOOLTIP[`triangle_${position}`]
    return (
        <div className="group relative inline-block">
            {children}
            <div className={tooltipStyle}>
                <span className={triangleStyle}></span>
                {message}
            </div>
        </div>
    )
}

export const renderTooltip = (children: any, message: any) => {
    return <Tooltip children={children} message={message} />
}

/*
const ToolTip1 = () => {
  return (
    <section class="bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
      <div className="container mx-auto py-12">
        <div className="-mx-4 flex flex-wrap justify-center">
   
        </div>
      </div>
    </section>
  );
};

export default ToolTip1; */

