import { CanvasState } from "cad-library";

export const exportProjectFrom = (canvas: CanvasState) => {
    return JSON.stringify(canvas)
}

export const exportComponentsFrom = (canvas: CanvasState) => {
    return JSON.stringify(canvas.components)
}
