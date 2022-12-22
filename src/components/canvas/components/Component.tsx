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
import { Edges } from "@react-three/drei";
import * as THREE from "three";

export interface ComponentProps {
  transformationParams: TransformationParams;
  keyComponent: number;
  borderVisible: boolean;
  setMeshRef: Function;
  setOrbitTarget: Function
}

export const Component: React.FC<ComponentProps> = ({
  children,
  transformationParams,
  keyComponent,
  borderVisible,
  setMeshRef,
  setOrbitTarget
}) => {
  const dispatch = useDispatch();
  const activeTransformation = useSelector(activeTransformationSelector);
  const toolbarTransformation = useSelector(toolbarTransformationStateSelector);
  const selectedComponentKey = useSelector(keySelectedComponenteSelector);
  const { onClickActionForMeshBasedOnModality, onDoubleClickActionForMeshBasedOnModality } =
    useCanvasFunctionsBasedOnModality();
  const mesh = useRef(null);

  useEffect(() => {
    keyComponent === selectedComponentKey &&
      setMeshRef(mesh.current as unknown as THREE.Mesh);
  }, [selectedComponentKey]);

  // useEffect(() => {
  //   let center = new THREE.Vector3();
  //   (mesh as unknown as THREE.Mesh).geometry?.computeBoundingBox();
  //   if ((mesh as unknown as THREE.Mesh).geometry !== undefined) {
  //     (mesh as unknown as THREE.Mesh).geometry.boundingBox?.getCenter(center);
  //     (mesh as unknown as THREE.Mesh).geometry.center();
  //     (mesh as unknown as THREE.Mesh).position.copy(center);
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log(transformationParams.position);
  //   console.log((mesh.current as unknown as THREE.Mesh).geometry);
  //   console.log((mesh.current as unknown as THREE.Mesh).position);
  // }, [transformationParams]);

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
            keyComponent,
          });
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          onDoubleClickActionForMeshBasedOnModality({position:(mesh.current as unknown as THREE.Mesh).position, id: (mesh.current as unknown as THREE.Mesh).id})
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
        {borderVisible && <Edges />}
      </mesh>
    </>
  );
};
