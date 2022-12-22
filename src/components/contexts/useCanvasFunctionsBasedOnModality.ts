import { useContext } from "react"
import { ModalityManagerContext } from "./modalityManagerProvider"

export const useCanvasFunctionsBasedOnModality = () => {
    const {onClickActionForMeshBasedOnModality, onDoubleClickActionForMeshBasedOnModality} = useContext(ModalityManagerContext)
    return  {onClickActionForMeshBasedOnModality, onDoubleClickActionForMeshBasedOnModality}
}