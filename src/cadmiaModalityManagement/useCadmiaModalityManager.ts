import { useDispatch, useSelector } from "react-redux";
import { cadmiaModalitySelector } from "./cadmiaModalitySlice";
import { Material, removeComponent, removeComponentMaterial, selectComponent, selectedComponentSelector, setComponentMaterial } from "cad-library";
import { toggleEntitySelectionForBinaryOp } from "../components/binaryOperationsToolbar/binaryOperationsToolbarSlice";
import { multipleSelectionEntitiesKeysSelector, toggleEntitySelectionForMultipleSelection } from "../components/miscToolbar/miscToolbarSlice";

export const useCadmiaModalityManager = () => {
    const modality = useSelector(cadmiaModalitySelector)
    const dispatch = useDispatch()
    const selectedComponent = useSelector(selectedComponentSelector)
    const multipleSelectionEntityKeys = useSelector(multipleSelectionEntitiesKeysSelector)

    const componentClick = (keyComponent: number) => {
        if (modality === 'NormalSelection') {
            selectedComponent.keyComponent !== keyComponent &&
                dispatch(selectComponent(keyComponent));
        } else if (modality === 'BinaryOperation') {
            dispatch(toggleEntitySelectionForBinaryOp(keyComponent));
        }
        else if (modality === 'MultipleSelection') {
            dispatch(toggleEntitySelectionForMultipleSelection(keyComponent))
        }
    }

    const singleSelectionIconStyle = () => modality === "NormalSelection" ? 'bg-gray-400' : 'bg-white'
    const multipleSelectionIconStyle = () => modality === "MultipleSelection" ? 'bg-gray-400' : 'bg-white'

    const setMaterial = (material: Material) =>
        (modality !== 'MultipleSelection') ?
            dispatch(
                setComponentMaterial({
                    key: selectedComponent.keyComponent,
                    material: material,
                })) :
            multipleSelectionEntityKeys.forEach(key => dispatch(setComponentMaterial({ key: key, material: material })))

    const unsetMaterial = () =>
        (modality !== 'MultipleSelection') ?
            dispatch(removeComponentMaterial({ keyComponent: selectedComponent.keyComponent }))
            :
            multipleSelectionEntityKeys.forEach(key => dispatch(removeComponentMaterial({ keyComponent: key })))

    const deleteComponentsButtonOnClick = () => {
        if (modality !== 'MultipleSelection') {
            dispatch(removeComponent(selectedComponent.keyComponent))
        } else {
            multipleSelectionEntityKeys.forEach(key => dispatch(removeComponent(key)))
        }
    }

    const deleteComponentsButtonMessages = () => modality !== 'MultipleSelection'
        ? { popup: `Sei sicuro di voler eliminare il componente ${selectedComponent.name} ?`, buttonLabel: `Delete ${selectedComponent.name}` }
        : { popup: `Sei sicuro di voler eliminare i componenti selezionati?`, buttonLabel: 'Delete components' }

    const sideBarElementsVisibility = () => {
        return {
            transformations: modality !== 'MultipleSelection' ? true : false,
            geometryParams: modality !== 'MultipleSelection' ? true : false,
            borders: modality !== 'MultipleSelection' ? true : false
        }
    }

    return {
        componentClick, singleSelectionIconStyle, multipleSelectionIconStyle,
        setMaterial, unsetMaterial, deleteComponentsButtonMessages, deleteComponentsButtonOnClick, sideBarElementsVisibility
    }
}