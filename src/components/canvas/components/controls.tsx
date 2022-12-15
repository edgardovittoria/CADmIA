import { TransformControls, OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Object3DNode, useThree } from "@react-three/fiber";
import { TransformationParams, updateTransformationParams } from "cad-library";
import { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToolbarTransformationState, toolbarTransformationStateSelector } from "../../../store/toolbarTransformationSlice";

export const Controls: FC<{
    keySelectedComponent: number;
    mesh: THREE.Mesh | undefined;
  }> = ({ keySelectedComponent, mesh }) => {
    const { camera } = useThree();
    const transformation = useRef(null);
    const toolbarTransformationState = useSelector(
      toolbarTransformationStateSelector
    );
    const dispatch = useDispatch();
  
    function getActiveTransformationType(
      toolbarTranformationState: ToolbarTransformationState
    ): string {
      return toolbarTranformationState.transformation.filter(
        (transformation) => transformation.active
      )[0].type;
    }
  
    useEffect(() => {
      if (transformation.current) {
        const controls: Object3DNode<any, any> = transformation.current;
        controls.addEventListener("dragging-changed", onChangeHandler);
        return () =>
          controls.removeEventListener("dragging-changed", onChangeHandler);
      }
    });
  
    function onChangeHandler(event: THREE.Event) {
      if (!event.value && transformation.current) {
        const controls: Object3DNode<any, any> = transformation.current;
        let transformationParmas: TransformationParams = {
          position: [
            controls.worldPosition.x,
            controls.worldPosition.y,
            controls.worldPosition.z,
          ],
          rotation: [
            controls.object.rotation._x,
            controls.object.rotation._y,
            controls.object.rotation._z,
          ],
          scale: [
            controls.worldScale.x,
            controls.worldScale.y,
            controls.worldScale.z,
          ],
        };
        dispatch(updateTransformationParams(transformationParmas));
      }
    }
    return (
      <>
        {(keySelectedComponent !== 0 && mesh !== undefined) && (
          <TransformControls
            camera={camera}
            ref={transformation}
            children={<></>}
            object={mesh}
            mode={getActiveTransformationType(toolbarTransformationState)}
          />
        )}
        <OrbitControls
          addEventListener={undefined}
          hasEventListener={undefined}
          removeEventListener={undefined}
          dispatchEvent={undefined}
          makeDefault
        />
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["red", "green", "blue"]}
            labelColor="black"
          />
        </GizmoHelper>
      </>
    );
  };