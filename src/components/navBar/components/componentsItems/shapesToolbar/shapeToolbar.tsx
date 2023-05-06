import React, { } from "react";
import cubeIcon from "./style/cube.png"
import torusIcon from "./style/torus.png"
import cylinderIcon from "./style/cylinder.png"
import sphereIcon from "./style/sphere.png"
import coneIcon from "./style/cone.png"
import { useAddToTheSceneANewShape } from "../addToTheSceneANewShape";

export const ShapesToolbar: React.FC = () => {
  const addToTheSceneANew = useAddToTheSceneANewShape()
  return (
    <>
      <div className="absolute left-[15px] top-[550px] w-[50px] text-center shadow">
        <div className="relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300"
          onClick={() => {addToTheSceneANew("Cube")}}
        >
          <img src={cubeIcon} alt="Add cube" />
          <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
            <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">Add cube</span>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300"
          onClick={() => {addToTheSceneANew("Sphere")}}
        >
          <img src={sphereIcon} alt="Add spehre" />
          <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
            <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">Add sphere</span>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300"
          onClick={() => {addToTheSceneANew("Cylinder")}}
        >
          <img src={cylinderIcon} alt="Add cylinder" />
          <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
            <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">Add cylinder</span>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300"
          onClick={() => {addToTheSceneANew("Torus")}}
        >
          <img src={torusIcon} alt="Add torus" />
          <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
            <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">Add torus</span>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300"
          onClick={() => {addToTheSceneANew("Cone")}}
        >
          <img src={coneIcon} alt="Add cone" />
          <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
            <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">Add cone</span>
          </div>
        </div>
      </div>
    </>
  );
};