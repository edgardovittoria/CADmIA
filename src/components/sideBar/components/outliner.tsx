import { CanvasState } from 'cad-library';
import React, {useEffect, useState} from 'react';
import { OutlinerItem } from './outlinerItem';

interface OutlinerProps {
    canvasState: CanvasState,
}

export const Outliner: React.FC<OutlinerProps> = ({canvasState}) => {

    const [optionActive, setOptionActive] = useState("");
    useEffect(() => {
        let selectedComponent = canvasState.components.filter(component => component.keyComponent === canvasState.selectedComponentKey)[0]
        if (selectedComponent !== undefined) {
            setOptionActive(selectedComponent.keyComponent.toString())
        }
    }, [canvasState.components, canvasState.selectedComponentKey]);

    return (
        <>
            <div className="h-[200px] max-h-[200px] border-2 border-amber-400 rounded p-2 overflow-scroll bg-gradient-to-r from-white to-slate-200">
                <div className="border-2 border-transparent text-black w-1/2 text-left pl-2">
                    <span className="text-black"/>
                    CANVAS
                </div>
                {canvasState.components.map(component => {
                    return (
                        <OutlinerItem key={component.keyComponent + component.name} keyComponent={component.keyComponent} nameComponent={component.name} isSelelctedComponent={component.keyComponent === canvasState.selectedComponentKey} />
                    )
                })}
            </div>
        </>
    )

}