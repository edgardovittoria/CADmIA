import React from 'react';
import {Switch} from "@headlessui/react";

interface VisualizationProps {
    borderVisible: boolean,
    setBorderVisible: (border: boolean) => void
}

export const Visualization: React.FC<VisualizationProps> = (
    {
        borderVisible, setBorderVisible
    }
) => {
    return (
        <>
            <div className="flex justify-between px-2">
                <span className="text-black">Border</span>
                <div>
                    <Switch
                        checked={(borderVisible !== undefined) ? borderVisible : false}
                        onChange={setBorderVisible}
                        className={`${borderVisible ? 'bg-teal-900' : 'bg-teal-700'} relative inline-flex mt-1 h-[18px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                            <span
                                aria-hidden="true"
                                className={`${borderVisible ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                            />
                    </Switch>
                </div>

            </div>
        </>
    )

}