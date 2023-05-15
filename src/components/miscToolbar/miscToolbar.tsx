import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComponent,
  ComponentEntity,
  getNewKeys,
  numberOfGeneratedKeySelector,
  selectedComponentSelector,
} from "cad-library";
import {DocumentDuplicateIcon} from "@heroicons/react/24/outline";


interface MiscToolbarProps {}

export const MiscToolbar: React.FC<MiscToolbarProps> = () => {
  const dispatch = useDispatch();
  const selectedComponent = useSelector(selectedComponentSelector);
  const numberOfGeneratedKey = useSelector(numberOfGeneratedKeySelector);
  return (
    <>
      <div className="absolute left-[450px] top-[10px] w-[50px] text-center shadow grid grid-cols-1">
          <div className={`relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300`}>
              <DocumentDuplicateIcon className="w-8 h-8" onClick={() => {
                  let newKey = getNewKeys(numberOfGeneratedKey, dispatch)[0];
                  let clonedEntity = {
                      ...selectedComponent,
                      keyComponent: newKey,
                  } as ComponentEntity;
                  dispatch(addComponent(clonedEntity));
              }}/>
              <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
                  <span className="relative z-10 p-2 leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">CLONE</span>
              </div>
          </div>
      </div>
    </>
  );
};