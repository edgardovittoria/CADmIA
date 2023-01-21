import { selectComponent, updateName } from "cad-library";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import {CubeIcon} from "@heroicons/react/24/outline";

interface OutlinerItemProps{
    keyComponent : number,
    nameComponent : string,
    isSelelctedComponent: boolean
}

export const OutlinerItem : FC<OutlinerItemProps> = ({keyComponent, nameComponent, isSelelctedComponent}) => {

    const [outlinerItemVisibility, setOutlinerItemVisibility] = useState(true);
    const [inputItemVisibility, setInputItemVisibility] = useState(false);
    const dispatch = useDispatch()

    return (
        <>
            <div
                key={keyComponent}
                className={
                `${isSelelctedComponent ? "border-2 border-amber-400 text-black rounded text-left pl-4" : "border-2 border-transparent text-black text-left pl-4"}
                 ${outlinerItemVisibility ? "flex w-1/2" : "hidden w-1/2"}   
                `

            }
                onClick={() => {
                    dispatch(selectComponent(keyComponent))
                }}
                onDoubleClick={() => {
                    setOutlinerItemVisibility(false)
                    setInputItemVisibility(true)
                }}
            >
                <CubeIcon className="w-[20px] mr-2"/>
                {nameComponent}
            </div>
            <div key={keyComponent + "_input"} className="text-left" hidden={!inputItemVisibility}>
                <input
                    type="text"
                    className="border-2 border-amber-400 text-black w-1/3 rounded text-left pl-4"
                    defaultValue={nameComponent}
                    onBlur={(e) => {
                        dispatch(updateName({key: keyComponent, name: e.currentTarget.value}))
                        setInputItemVisibility(false)
                        setOutlinerItemVisibility(true)
                    }}
                />
            </div>
        </>

    )
}