import { addComponent, getDefaultCone, getDefaultCube, getDefaultCylinder, getDefaultSphere, getDefaultTorus, numberOfGeneratedKeySelector } from "cad-library";
import { useDispatch, useSelector } from "react-redux";
import cubeIcon from "./style/cube.png"
import torusIcon from "./style/torus.png"
import cylinderIcon from "./style/cylinder.png"
import sphereIcon from "./style/sphere.png"
import coneIcon from "./style/cone.png"

export const useAddToTheSceneANewShape = () => {
    const dispatch = useDispatch()
    const numberOfGeneratedKey = useSelector(numberOfGeneratedKeySelector);
    const addToTheSceneANew = (shape: string) => {
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

    const iconForA = (shape: string) => {
        switch (shape) {
            case "Cube": return cubeIcon
            case "Cylinder": return cylinderIcon
            case "Cone": return coneIcon
            case "Sphere": return sphereIcon
            case "Torus": return torusIcon
            default:
                break;
        }
    }
    return {addToTheSceneANew, iconForA}
}

export const baseShapes : string[] = ["Cube", "Sphere", "Cylinder", "Torus", "Cone"]