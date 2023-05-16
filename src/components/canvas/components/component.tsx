import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNextTransformationActive,
} from "../../transformationsToolbar/toolbarTransformationSlice";
import {
  keySelectedComponenteSelector,
  selectComponent,
  TransformationParams,
} from "cad-library";
import { Edges, useBounds } from "@react-three/drei";
import * as THREE from "three";
import { toggleEntitySelectionForBinaryOp } from "../../binaryOperationsToolbar/binaryOperationsToolbarSlice";
import { cadmiaModalitySelector } from "../../../cadmiaModalityManagement/cadmiaModalitySlice";
import { toggleEntitySelectionForMultipleSelection } from "../../miscToolbar/miscToolbarSlice";

export interface ComponentProps {
  transformationParams: TransformationParams;
  keyComponent: number;
  borderVisible: boolean;
  setMeshRef: Function;
}

export const Component: React.FC<ComponentProps> = ({
  children,
  transformationParams,
  keyComponent,
  borderVisible,
  setMeshRef
}) => {
  const dispatch = useDispatch();
  const selectedComponentKey = useSelector(keySelectedComponenteSelector);
  const mesh = useRef(null);
  const bounds = useBounds()
  const modality = useSelector(cadmiaModalitySelector)

  useEffect(() => {
    keyComponent === selectedComponentKey &&
      setMeshRef(mesh.current as unknown as THREE.Mesh);
  }, [selectedComponentKey]);

  useEffect(() => {
    bounds.refresh(mesh.current as unknown as THREE.Mesh).fit().clip()
  }, [mesh])


  return (
    <mesh
      ref={mesh}
      name={keyComponent.toString()}
      position={transformationParams.position}
      rotation={transformationParams.rotation}
      scale={transformationParams.scale}
      onDoubleClick={(e) => {
        e.stopPropagation() 
        bounds.refresh(e.object).fit().clip()}}
      onContextMenu={(e) => {
        e.stopPropagation();
        dispatch(setNextTransformationActive())
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (modality === 'NormalSelection') {
          selectedComponentKey !== keyComponent &&
            dispatch(selectComponent(keyComponent));
        } else if (modality === 'BinaryOperation') {
          dispatch(toggleEntitySelectionForBinaryOp(keyComponent));
        }
        else if (modality === 'MultipleSelection'){
          dispatch(toggleEntitySelectionForMultipleSelection(keyComponent))
        }
      }}
    >
      {children}
      {borderVisible && <Edges />}
    </mesh>
  );
};
