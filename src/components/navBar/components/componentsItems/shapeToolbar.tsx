import React, { } from "react";
import { useAddToTheSceneANewShape } from "./useAddToTheSceneANewShape";

export const ShapesToolbar: React.FC = () => {
  const {addToTheSceneANew, iconForA} = useAddToTheSceneANewShape()
  return (
    <>
      <div className="absolute left-[15px] top-[550px] w-[50px] text-center shadow">
        <div className="relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300"
          onClick={() => {addToTheSceneANew("Cube")}}
        >
          <img src={iconForA("Cube")} alt="Add cube" />
          <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
            <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">Add cube</span>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300"
          onClick={() => {addToTheSceneANew("Sphere")}}
        >
          <img src={iconForA("Sphere")} alt="Add spehre" />
          <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
            <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">Add sphere</span>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300"
          onClick={() => {addToTheSceneANew("Cylinder")}}
        >
          <img src={iconForA("Cylinder")} alt="Add cylinder" />
          <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
            <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">Add cylinder</span>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300"
          onClick={() => {addToTheSceneANew("Torus")}}
        >
          <img src={iconForA("Torus")} alt="Add torus" />
          <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
            <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">Add torus</span>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300"
          onClick={() => {addToTheSceneANew("Cone")}}
        >
          <img src={iconForA("Cone")} alt="Add cone" />
          <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
            <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">Add cone</span>
          </div>
        </div>
      </div>
    </>
  );
};