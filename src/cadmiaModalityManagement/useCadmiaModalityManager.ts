import { useDispatch, useSelector } from "react-redux";
import { cadmiaModalitySelector } from "./cadmiaModalitySlice";
import { Material, componentseSelector, removeComponent, removeComponentMaterial, selectComponent, selectedComponentSelector, setComponentMaterial, setComponentsOpacity } from "cad-library";
import { toggleEntitySelectionForBinaryOp } from "../components/binaryOperationsToolbar/binaryOperationsToolbarSlice";
import { multipleSelectionEntitiesKeysSelector, toggleEntitySelectionForMultipleSelection } from "../components/miscToolbar/miscToolbarSlice";
import { useEffect } from "react";

export const useCadmiaModalityManager = () => {
    const modality = useSelector(cadmiaModalitySelector)
    const dispatch = useDispatch()
    const selectedComponent = useSelector(selectedComponentSelector)
    const multipleSelectionEntityKeys = useSelector(multipleSelectionEntitiesKeysSelector)

    const componentOpsBasedOnModality = {
        onClickAction: (keyComponent: number) => {
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
    }

    const miscToolbarOpsBasedOnModality = {
        iconStyles: {
            singleSelectionBackground: modality === "NormalSelection" ? 'bg-gray-400' : 'bg-white',
            multipleSelectionBackground: modality === "MultipleSelection" ? 'bg-gray-400' : 'bg-white'
        }
    }

    const sideBarOptsBasedOnModality = {
        elementsVisibility: {
            transformations: modality !== 'MultipleSelection' ? true : false,
            geometryParams: modality !== 'MultipleSelection' ? true : false,
            borders: modality !== 'MultipleSelection' ? true : false
        },
        deleteButton: {
            messages: modality !== 'MultipleSelection'
                ? { popup: `Sei sicuro di voler eliminare il componente ${selectedComponent.name} ?`, buttonLabel: `Delete ${selectedComponent.name}` }
                : { popup: `Sei sicuro di voler eliminare i componenti selezionati?`, buttonLabel: 'Delete components' },
            onClickAction: () => {
                if (modality !== 'MultipleSelection') {
                    dispatch(removeComponent(selectedComponent.keyComponent))
                } else {
                    multipleSelectionEntityKeys.forEach(key => dispatch(removeComponent(key)))
                }
            }
        },
        material: {
            setMaterial: (material: Material) =>
                (modality !== 'MultipleSelection') ?
                    dispatch(
                        setComponentMaterial({
                            key: selectedComponent.keyComponent,
                            material: material,
                        })) :
                    multipleSelectionEntityKeys.forEach(key => dispatch(setComponentMaterial({ key: key, material: material }))),
            unsetMaterial: () =>
                (modality !== 'MultipleSelection') ?
                    dispatch(removeComponentMaterial({ keyComponent: selectedComponent.keyComponent }))
                    :
                    multipleSelectionEntityKeys.forEach(key => dispatch(removeComponentMaterial({ keyComponent: key })))
        }
    }
    
    const useBaseOpactityBasedOnModality = () => {
        const modality = useSelector(cadmiaModalitySelector)
        const components = useSelector(componentseSelector)
        useEffect(() => {
            let componentKeys = components.reduce(
                (keys: number[], component) => {
                    keys.push(component.keyComponent);
                    return keys;
                },
                []
            );
            if (modality !== 'NormalSelection') {
                dispatch(setComponentsOpacity({ keys: componentKeys, opacity: 0.3 }));
            } else {
                dispatch(setComponentsOpacity({ keys: componentKeys, opacity: 1 }));
            }
        }, [modality]);
    }

    return {
        componentOpsBasedOnModality, miscToolbarOpsBasedOnModality,
        sideBarOptsBasedOnModality, useBaseOpactityBasedOnModality
    }
}