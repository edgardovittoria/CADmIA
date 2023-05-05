import React, { } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComponent,
  getDefaultCone,
  getDefaultCube,
  getDefaultCylinder,
  getDefaultSphere,
  getDefaultTorus,
  numberOfGeneratedKeySelector,
} from "cad-library";
import cubeIcon from "./style/cube.png"
import torusIcon from "./style/torus.png"
import cylinderIcon from "./style/cylinder.png"
import sphereIcon from "./style/sphere.png"
import coneIcon from "./style/cone.png"

export const ShapesToolbar: React.FC = () => {
  const dispatch = useDispatch();
  const numberOfGeneratedKey = useSelector(numberOfGeneratedKeySelector);
  return (
    <>
      <div className="absolute left-[15px] top-[550px] w-[50px] text-center shadow">
        <div className="relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300"
          onClick={() => {
            let cube = getDefaultCube(numberOfGeneratedKey, dispatch);
            dispatch(addComponent(cube))
          }}
        >
          <img src={cubeIcon} alt="Add cube" />
          <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
            <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">Add cube</span>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300"
          onClick={() => {
            let sphere = getDefaultSphere(numberOfGeneratedKey, dispatch);
            dispatch(addComponent(sphere))
          }}
        >
          <img src={sphereIcon} alt="Add spehre" />
          <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
            <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">Add sphere</span>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300"
          onClick={() => {
            let cylinder = getDefaultCylinder(numberOfGeneratedKey, dispatch);
            dispatch(addComponent(cylinder))
          }}
        >
          <img src={cylinderIcon} alt="Add cylinder" />
          <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
            <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">Add cylinder</span>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300"
          onClick={() => {
            let torus = getDefaultTorus(numberOfGeneratedKey, dispatch);
            dispatch(addComponent(torus))
          }}
        >
          <img src={torusIcon} alt="Add torus" />
          <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
            <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">Add torus</span>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300"
          onClick={() => {
            let cone = getDefaultCone(numberOfGeneratedKey, dispatch);
            dispatch(addComponent(cone))
          }}
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