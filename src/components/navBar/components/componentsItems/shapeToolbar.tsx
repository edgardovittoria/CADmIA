import React, { } from "react";
import { baseShapes, useAddToTheSceneANewShape } from "./useAddToTheSceneANewShape";

export const ShapesToolbar: React.FC = () => {
  const { addToTheSceneANew, iconForA } = useAddToTheSceneANewShape()
  return (
      <div className="absolute left-[15px] top-[550px] w-[50px] text-center shadow">
        {baseShapes.map(shape =>
          <div className="relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300"
            onClick={() => { addToTheSceneANew(shape) }}
          >
            <img src={iconForA(shape)} alt={"Add " + shape} />
            <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
              <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">Add {shape}</span>
            </div>
          </div>
        )}
      </div>
  );
};