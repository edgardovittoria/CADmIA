import { selectComponent } from "cad-library";
import { createContext, FC, useState } from "react";
import { useDispatch } from "react-redux";
import { CadmiaModality } from "../../models/cadmiaModality";
import { toggleEntitySelectionForBinaryOp } from "../binaryOperationsToolbar/binaryOperationsToolbarSlice";
import { Vector3 } from "three";

type OrbitTarget =
  | {
      id: string;
      position: Vector3;
    }
  | undefined;

export type ModalityManagerContextType = {
  modality: CadmiaModality;
  setModality: Function;
  onClickActionForMeshBasedOnModality: Function;
  orbitTarget: OrbitTarget;
  setOrbitTarget: Function;
  onDoubleClickActionForMeshBasedOnModality: Function;
};

export const ModalityManagerContext = createContext<ModalityManagerContextType>(
  {
    modality: CadmiaModality.NormalSelection,
    setModality: (f: any) => f,
    onClickActionForMeshBasedOnModality: (f: any) => f,
    orbitTarget: undefined,
    onDoubleClickActionForMeshBasedOnModality: (f: any) => f,
    setOrbitTarget: (f:any) => f
  }
);

export const ModalityManagerProvider: FC<{}> = ({ children }) => {
  const [modality, setModality] = useState(CadmiaModality.NormalSelection);
  const [orbitTarget, setOrbitTarget] = useState<OrbitTarget>(undefined);
  const dispatch = useDispatch();
  const onClickActionForMeshBasedOnModality = (f: any) => {
    if (modality === CadmiaModality.NormalSelection) {
      f.selectedComponentKey !== f.keyComponent &&
        dispatch(selectComponent(f.keyComponent));
    } else if (modality === CadmiaModality.BinaryOperation) {
      dispatch(toggleEntitySelectionForBinaryOp(f.keyComponent));
    }
  };

  const onDoubleClickActionForMeshBasedOnModality = (f: any) => {
    setOrbitTarget(f as OrbitTarget);
  };

  return (
    <ModalityManagerContext.Provider
      value={
        {
          modality: modality,
          setModality: setModality,
          onClickActionForMeshBasedOnModality:
            onClickActionForMeshBasedOnModality,
          orbitTarget: orbitTarget,
          onDoubleClickActionForMeshBasedOnModality:
            onDoubleClickActionForMeshBasedOnModality,
            setOrbitTarget: setOrbitTarget
        } as ModalityManagerContextType
      }
    >
      {children}
    </ModalityManagerContext.Provider>
  );
};
