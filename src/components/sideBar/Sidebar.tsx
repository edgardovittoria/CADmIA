import React from "react";
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Transformations } from "./components/transformations";
import { GeometryParams } from "./components/geometryParams/geometryParams";
import { MaterialSelection } from "./components/materialSelection";
import {
  componentseSelector,
  Material,
  removeComponent,
  removeComponentMaterial,
  selectedComponentSelector,
  setComponentMaterial,
} from "cad-library";
import { useDispatch, useSelector } from "react-redux";
import { Outliner } from "./components/outliner";
import { Visualization } from "./components/Visualization";
import { borderFlagComponent } from "../../App";

interface SidebarProps {
  sideBarVisibility: boolean;
  setSideBarVisibility: (visibility: boolean) => void;
  bordersVisible: borderFlagComponent[];
  setBorderForComponent: (comp: number, border: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sideBarVisibility,
  setSideBarVisibility,
  bordersVisible,
  setBorderForComponent,
}) => {
  const canvasComponents = useSelector(componentseSelector);
  const selectedComponent = useSelector(selectedComponentSelector);
  const dispatch = useDispatch();
  const setMaterial = (material: Material) =>
    dispatch(
      setComponentMaterial({
        key: selectedComponent.keyComponent,
        material: material,
      })
    );
  const unsetMaterial = () =>
    dispatch(
      removeComponentMaterial({ keyComponent: selectedComponent.keyComponent })
    );
  const setBorderForSelectedComponent = (border: boolean) => {
    setBorderForComponent(selectedComponent.keyComponent, border);
  };

  return (
    <>
      {sideBarVisibility ? (
        <div
          className={`absolute top-[-2px] right-0 w-[23vw] bg-white p-[20px] text-white fixed h-full text-center
                ${
                  sideBarVisibility
                    ? "translate-x-0 transition "
                    : "translate-x-full transition"
                }
            `}
        >
          <div className="flex items-center">
            <XMarkIcon
              className="text-black w-4 h-4 hover:cursor-pointer"
              onClick={() => setSideBarVisibility(false)}
            />
            <h2 className="mb-[10px] text-xl text-black mx-auto">
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
                <h6 className="text-black mb-2 mt-2">Transformation Params</h6>
                <hr className="text-black" />
                <Transformations
                  transformationParams={selectedComponent.transformationParams}
                />
                <h6 className="text-black mt-[20px]">Geometry Params</h6>
                <hr className="text-black mb-2 mt-2" />
                <GeometryParams entity={selectedComponent} />
                <MaterialSelection
                  defaultMaterial={selectedComponent.material}
                  setMaterial={setMaterial}
                  unsetMaterial={unsetMaterial}
                />
                <h6 className="text-black mt-[20px]">Visualization</h6>
                <hr className="text-black mb-2 mt-2" />
                <Visualization
                  borderVisible={
                    bordersVisible.filter(
                      (b) => b.componentKey === selectedComponent.keyComponent
                    ).length > 0
                      ? bordersVisible.filter(
                          (b) =>
                            b.componentKey === selectedComponent.keyComponent
                        )[0].borders
                      : false
                  }
                  setBorderVisible={setBorderForSelectedComponent}
                />
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
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="absolute top-[10px] right-[10px] w-[3vw] bg-white p-[10px] text-white fixed text-center shadow">
          <div
            className="flex flex-col items-center py-1  border-2 border-gray-300 rounded hover:border-black hover:cursor-pointer"
            onClick={() => setSideBarVisibility(true)}
          >
            <AdjustmentsHorizontalIcon className="text-black w-5 h-5" />
          </div>
        </div>
      )}
    </>
  );
};
