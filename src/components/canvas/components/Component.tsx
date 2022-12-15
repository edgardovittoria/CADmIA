import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activeTransformationSelector,
  getIndexTransformationByName,
  setTransformationActive,
  toolbarTransformationStateSelector,
} from "../../../store/toolbarTransformationSlice";
import {
  keySelectedComponenteSelector,
  TransformationParams,
} from "cad-library";
import { useCanvasFunctionsBasedOnModality } from "../../contexts/useCanvasFunctionsBasedOnModality";
import {Edges} from "@react-three/drei";

export interface ComponentProps {
  transformationParams: TransformationParams;
  keyComponent: number;
  borderVisible: boolean,
  setMeshRef: Function
}

export const Component: React.FC<ComponentProps> = ({
  children,
  transformationParams,
  keyComponent,
  borderVisible,
  setMeshRef
}) => {
  const dispatch = useDispatch();
  const activeTransformation = useSelector(activeTransformationSelector);
  const toolbarTransformation = useSelector(toolbarTransformationStateSelector);
  const selectedComponentKey = useSelector(keySelectedComponenteSelector);
  const { onClickActionForMeshBasedOnModality } =
    useCanvasFunctionsBasedOnModality();
  const mesh = useRef(null)
  
  useEffect(() => {
    (keyComponent === selectedComponentKey) && setMeshRef((mesh.current as unknown) as THREE.Mesh)
  },[selectedComponentKey])
  
  return (
    <>
      <mesh
        ref={mesh}
        name={keyComponent.toString()}
        position={transformationParams.position}
        rotation={transformationParams.rotation}
        scale={transformationParams.scale}
        onClick={(e) => {
          e.stopPropagation();
          onClickActionForMeshBasedOnModality({
            selectedComponentKey,
            keyComponent
          });
        }}
        onContextMenu={(e) => {
          e.stopPropagation();
          let index =
            (getIndexTransformationByName(
              activeTransformation.type,
              toolbarTransformation
            ) +
              1) %
            toolbarTransformation.transformation.length;
          dispatch(
            setTransformationActive(
              toolbarTransformation.transformation[index].type
            )
          );
        }}
      >
        {children}
        {(borderVisible) && <Edges/>}
      </mesh>
    </>
  );
};
