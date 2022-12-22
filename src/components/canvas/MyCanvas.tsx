import React, { useState } from "react";
import { Provider, ReactReduxContext, useSelector } from "react-redux";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  componentseSelector,
  FactoryShapes,
  keySelectedComponenteSelector,
} from "cad-library";
import { Component } from "./components/Component";
import { ModalityManagerContext } from "../contexts/modalityManagerProvider";
import { borderFlagComponent } from "../../App";
import { Controls } from "./components/controls";

interface MyCanvasProps {
  // borderVisible: boolean,
  bordersVisible: borderFlagComponent[];
}

export const MyCanvas: React.FC<MyCanvasProps> = ({ bordersVisible }) => {
  const components = useSelector(componentseSelector);
  const keySelectedComponent = useSelector(keySelectedComponenteSelector);
  const [orbitTarget, setOrbitTarget] = useState<THREE.Mesh | undefined>(
    undefined
  );
  const [meshSelected, setMeshSelected] = useState<THREE.Mesh | undefined>(
    undefined
  );
  return (
    <div className="h-[93vh]">
      <ReactReduxContext.Consumer>
        {({ store }) => (
          // <MeshesAndCollisionsContext.Consumer>
          //   {(MeshesContextType) => (
          <ModalityManagerContext.Consumer>
            {(ModalityManagerContextType) => (
              <>
                <Canvas
                  className="w-full h-full"
                  style={{ backgroundColor: "whitesmoke" }}
                  camera={{
                    position: [0, 50, 0],
                    fov: 20,
                    far: 1000,
                    near: 0.1,
                  }}
                >
                  <Provider store={store}>
                    {/* <MeshesAndCollisionsContext.Provider
                          value={MeshesContextType}
                        > */}
                    <ModalityManagerContext.Provider
                      value={ModalityManagerContextType}
                    >
                      <pointLight position={[100, 100, 100]} intensity={0.8} />
                      <hemisphereLight
                        color="#ffffff"
                        groundColor={new THREE.Color("#b9b9b9")}
                        position={[-7, 25, 13]}
                        intensity={0.85}
                      />
                      {/* <SetMeshes components={components} /> */}
                      {components.map((component) => {
                        return (
                          <Component
                            setOrbitTarget={setOrbitTarget}
                            setMeshRef={setMeshSelected}
                            key={component.keyComponent}
                            keyComponent={component.keyComponent}
                            transformationParams={
                              component.transformationParams
                            }
                            borderVisible={
                              bordersVisible.filter(
                                (b) => b.componentKey === component.keyComponent
                              ).length > 0
                                ? bordersVisible.filter(
                                    (b) =>
                                      b.componentKey === component.keyComponent
                                  )[0].borders
                                : false
                            }
                          >
                            <FactoryShapes entity={component} />
                          </Component>
                        );
                      })}
                      {/* {keySelectedComponent !== 0 &&
                                                <DetectCollision entity={findComponentByKey(components, keySelectedComponent)} />
                                            } */}
                      <Controls
                        keySelectedComponent={keySelectedComponent}
                        mesh={meshSelected}
                      />
                      <gridHelper
                        args={[40, 20, "#434141", "#434141"]}
                        scale={[1, 1, 1]}
                      />
                    </ModalityManagerContext.Provider>
                    {/* </MeshesAndCollisionsContext.Provider> */}
                  </Provider>
                </Canvas>
              </>
            )}
          </ModalityManagerContext.Consumer>
          //   )}
          // </MeshesAndCollisionsContext.Consumer>
        )}
      </ReactReduxContext.Consumer>
    </div>
  );
};

// const SetMeshes: FC<{ components: ComponentEntity[] }> = ({ components }) => {
//   const { scene } = useThree();
//   const { setMeshes } = useMeshes();
//   useEffect(() => {
//     setMeshes(getObjectsFromSceneByType(scene, "Mesh"));
//   }, [scene, components, setMeshes]);
//   return <></>;
// };
