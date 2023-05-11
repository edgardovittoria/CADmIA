import React, {} from "react";
import {baseShapes, useAddToTheSceneANewShape} from "./useAddToTheSceneANewShape";

export const ShapesToolbar: React.FC = () => {
    const {addToTheSceneANew, iconForA} = useAddToTheSceneANewShape()
    return (
        <div className="absolute left-[15px] top-[200px] w-[50px] text-center shadow">
            {baseShapes.map(shape =>
                    <div
                        className="relative p-3 group bg-white hover:bg-gray-300 h-[50px]"
                        onClick={() => {
                            addToTheSceneANew(shape)
                        }}
                        key={shape}
                    >
                        <img src={iconForA(shape)} alt={"Add " + shape} className="w-[25px]"/>
                        <div
                            className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
                            <span
                                className="relative z-10 p-2  leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">Add {shape}</span>
                        </div>
                    </div>
            )}
        </div>
    );
};