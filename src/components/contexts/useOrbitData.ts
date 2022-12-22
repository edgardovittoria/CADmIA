import { useContext } from "react"
import { ModalityManagerContext } from "./modalityManagerProvider"

export const useOrbitData = () => {
    const {orbitTarget, setOrbitTarget} = useContext(ModalityManagerContext)
    return  {orbitTarget, setOrbitTarget}
}