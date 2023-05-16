import React from "react";
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Transformations } from "./components/transformations";
import { GeometryParams } from "./components/geometryParams/geometryParams";
import { MaterialSelection } from "./components/materialSelection/materialSelection";
import {
  componentseSelector,
  Material,
  removeComponent,
  removeComponentMaterial,
  selectedComponentSelector,
  setComponentMaterial,
} from "cad-library";
import { useDispatch, useSelector } from "react-redux";
import { Outliner } from "./components/outliner/outliner";
import { BordersMeshOption } from "./components/bordersMeshOption";
import { closeSidebar, openSidebar, sidebarVisibilitySelector } from "./sidebarSlice";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { cadmiaModalitySelector } from "../../cadmiaModalityManagement/cadmiaModalitySlice";
import { multipleSelectionEntitiesKeysSelector } from "../miscToolbar/miscToolbarSlice";

interface SidebarProps {
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const canvasComponents = useSelector(componentseSelector);
  const selectedComponent = useSelector(selectedComponentSelector);
  const sideBarVisibility = useSelector(sidebarVisibilitySelector)
  const cadmiaModality = useSelector(cadmiaModalitySelector)
  const multipleSelectionEntityKeys = useSelector(multipleSelectionEntitiesKeysSelector)
  const dispatch = useDispatch();

  const setMaterial = (material: Material) =>
    (cadmiaModality !== 'MultipleSelection') ?
      dispatch(
        setComponentMaterial({
          key: selectedComponent.keyComponent,
          material: material,
        })) :
      multipleSelectionEntityKeys.forEach(key => dispatch(setComponentMaterial({ key: key, material: material })))

  const unsetMaterial = () =>
    (cadmiaModality !== 'MultipleSelection') ?
      dispatch(removeComponentMaterial({ keyComponent: selectedComponent.keyComponent }))
      :
      multipleSelectionEntityKeys.forEach(key => dispatch(removeComponentMaterial({ keyComponent: key })))

  return (
    <>
      {sideBarVisibility ? (
        <div
          className={`absolute top-[-2px] right-0 w-[23vw] bg-white p-[20px] text-white fixed h-full text-center
                ${sideBarVisibility
              ? "translate-x-0 transition "
              : "translate-x-full transition"
            }
            `}
        >
          <div className="flex items-center mb-[10px]">
            <AiOutlineCloseCircle
              className="text-black w-4 h-4 hover:cursor-pointer"
              onClick={() => dispatch(closeSidebar())}
            />
            <h2 className="text-xl text-black text-sm mx-auto font-bold">
              Object Details
            </h2>
          </div>
          <div className="h-full max-h-[800px] overflow-scroll">
            <Outliner
              components={canvasComponents}
              selectedComponent={selectedComponent}
            />
            {selectedComponent && (
              <div className="text-left">
                {cadmiaModality !== 'MultipleSelection' &&
                  <>
                    <h6 className="text-black mt-[10px] text-sm font-bold">Transformation Params</h6>
                    <hr className="border-amber-500 mt-1" />
                    <Transformations
                      transformationParams={selectedComponent.transformationParams}
                    />
                    <h6 className="text-black mt-[10px] text-sm font-bold">Geometry Params</h6>
                    <hr className="border-amber-500 mb-2 mt-1" />
                    <GeometryParams entity={selectedComponent} />
                  </>}
                <MaterialSelection
                  defaultMaterial={selectedComponent.material}
                  setMaterial={setMaterial}
                  unsetMaterial={unsetMaterial}
                />
                {cadmiaModality !== 'MultipleSelection' &&
                  <>
                    <h6 className="text-black mt-[10px] text-sm font-bold">Visualization</h6>
                    <hr className="border-amber-500 mb-2 mt-1" />
                    <BordersMeshOption />
                  </>
                }
                {cadmiaModality !== 'MultipleSelection' ?
                  <button
                    type="button"
                    className="rounded bg-red-500 shadow p-2 mt-[20px] w-full"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Sei sicuro di voler eliminare il componente ${selectedComponent.name} ?`
                        )
                      ) {
                        dispatch(removeComponent(selectedComponent.keyComponent));
                      }
                    }}
                  >
                    Delete {selectedComponent.name}
                  </button>
                  :
                  <button
                    type="button"
                    className="rounded bg-red-500 shadow p-2 mt-[20px] w-full"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Sei sicuro di voler eliminare i componenti selezionati?`
                        )
                      ) {
                        multipleSelectionEntityKeys.forEach(key => dispatch(removeComponent(key)));
                      }
                    }}
                  >
                    Delete components
                  </button>
                }
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="absolute top-[10px] right-[10px] w-[3vw] bg-white p-[10px] text-white fixed text-center shadow">
          <div
            className="flex flex-col items-center py-1  border-2 border-gray-300 rounded hover:border-black hover:cursor-pointer"
            onClick={() => dispatch(openSidebar())}
          >
            <AdjustmentsHorizontalIcon className="text-black w-5 h-5" />
          </div>
        </div>
      )}
    </>
  );
};
