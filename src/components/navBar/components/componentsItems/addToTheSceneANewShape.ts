import { addComponent, getDefaultCone, getDefaultCube, getDefaultCylinder, getDefaultSphere, getDefaultTorus, numberOfGeneratedKeySelector } from "cad-library";
import { useDispatch, useSelector } from "react-redux";

export const useAddToTheSceneANewShape = () => {
    const dispatch = useDispatch()
    const numberOfGeneratedKey = useSelector(numberOfGeneratedKeySelector);
    const addToTheSceneANew = (shape: BaseShape) => {
        switch (shape) {
            case "Cube":
                dispatch(addComponent(getDefaultCube(numberOfGeneratedKey, dispatch)))
                break;
            case "Cylinder":
                dispatch(addComponent(getDefaultCylinder(numberOfGeneratedKey, dispatch)))
                break;
            case "Cone":
                dispatch(addComponent(getDefaultCone(numberOfGeneratedKey, dispatch)))
                break;
            case "Sphere":
                dispatch(addComponent(getDefaultSphere(numberOfGeneratedKey, dispatch)))
                break;
            case "Torus":
                dispatch(addComponent(getDefaultTorus(numberOfGeneratedKey, dispatch)))
                break;
            default:
                break;
        }
    }
    return addToTheSceneANew
}

export type BaseShape = "Cube" | "Sphere" | "Torus" | "Cone" | "Cylinder"