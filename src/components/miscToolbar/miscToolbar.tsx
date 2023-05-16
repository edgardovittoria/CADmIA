import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComponent,
  ComponentEntity,
  getNewKeys,
  numberOfGeneratedKeySelector,
  selectedComponentSelector,
  setComponentsOpacity,
} from "cad-library";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import single_select from "./style/single_select.svg"
import multiple_select from "./style/multiple_select.png"
import { setModality } from "../../cadmiaModalityManagement/cadmiaModalitySlice";
import { CadmiaModality } from "../../cadmiaModalityManagement/cadmiaModalityType";
import { multipleSelectionEntitiesKeysSelector } from "./miscToolbarSlice";
import { useCadmiaModalityManager } from "../../cadmiaModalityManagement/useCadmiaModalityManager";


interface MiscToolbarProps { }

export const MiscToolbar: React.FC<MiscToolbarProps> = () => {
  const dispatch = useDispatch();
  const { multipleSelectionIconStyle, singleSelectionIconStyle } = useCadmiaModalityManager()
  const selectedComponent = useSelector(selectedComponentSelector);
  const numberOfGeneratedKey = useSelector(numberOfGeneratedKeySelector);
  const multipleSelectionEntityKeys = useSelector(multipleSelectionEntitiesKeysSelector)
  const [temporaryEntitiesForMultipleSelection, setTemporaryEntitiesForMultipleSelection] =
    useState(multipleSelectionEntityKeys);

  useEffect(() => {
    if (
      temporaryEntitiesForMultipleSelection.length > multipleSelectionEntityKeys.length
    ) {
      let elements = temporaryEntitiesForMultipleSelection.filter(
        (el) => !multipleSelectionEntityKeys.includes(el)
      );
      dispatch(setComponentsOpacity({ keys: elements, opacity: 0.3 }));
    } else {
      let elements = multipleSelectionEntityKeys.filter(
        (el) => !temporaryEntitiesForMultipleSelection.includes(el)
      );
      dispatch(setComponentsOpacity({ keys: elements, opacity: 1 }));
    }
    setTemporaryEntitiesForMultipleSelection(multipleSelectionEntityKeys);
  }, [multipleSelectionEntityKeys]);


  return (
    <>
      <div className="absolute left-[450px] top-[10px] w-[150px] text-center shadow grid grid-cols-3">
        <div className={`relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white`}>
          <DocumentDuplicateIcon className="w-8 h-8" onClick={() => {
            let newKey = getNewKeys(numberOfGeneratedKey, dispatch)[0];
            let clonedEntity = {
              ...selectedComponent,
              keyComponent: newKey,
            } as ComponentEntity;
            dispatch(addComponent(clonedEntity));
          }} />
          <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
            <span className="relative z-10 p-2 leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">CLONE</span>
          </div>
        </div>
        <div className={`relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group ${singleSelectionIconStyle()}`}
          onClick={() => dispatch(setModality('NormalSelection' as CadmiaModality))}>
          <img src={single_select} alt="Single selection" className="w-8 h-8" />
          <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
            <span className="relative z-10 p-2 leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">SINGLE SELECTION</span>
          </div>
        </div>
        <div className={`relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group ${multipleSelectionIconStyle()}`}
          onClick={() => dispatch(setModality('MultipleSelection' as CadmiaModality))}>
          <img src={multiple_select} alt="Multiple selection" className="w-8 h-8" />
          <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
            <span className="relative z-10 p-2 leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">MULTIPLE SELECTION</span>
          </div>
        </div>
      </div>
    </>
  );
};
