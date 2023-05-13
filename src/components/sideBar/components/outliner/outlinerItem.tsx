import { selectComponent, updateName } from "cad-library";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CubeIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";

interface OutlinerItemProps {
    keyComponent: number,
    nameComponent: string,
    isSelelctedComponent: boolean
}

export const OutlinerItem: FC<OutlinerItemProps> = ({ keyComponent, nameComponent, isSelelctedComponent }) => {

    const [outlinerItemVisibility, setOutlinerItemVisibility] = useState(true);
    const dispatch = useDispatch()

    useEffect(() => {
        !isSelelctedComponent && setOutlinerItemVisibility(true)
    }, [isSelelctedComponent])


    return (
        <>
            {!isSelelctedComponent ?
                <div
                    key={keyComponent}
                    className="border-2 border-transparent text-black text-left pl-4 flex w-1/2"
                    onClick={() => {
                        dispatch(selectComponent(keyComponent))
                    }}
                >
                    <CubeIcon className="w-[20px] mr-2" />
                    {nameComponent}
                </div>
                : (
                    outlinerItemVisibility ?
                        <Row>
                            <Col
                                key={keyComponent}
                                className="border-2 border-amber-400 text-black rounded text-left pl-4 flex w-1/2"
                                onClick={() => { dispatch(selectComponent(keyComponent)) }}
                            >
                                <CubeIcon className="w-[20px] mr-2" />
                                {nameComponent}
                            </Col>
                            <Col><FontAwesomeIcon className="text-black" icon={faPenSquare} onClick={() => { setOutlinerItemVisibility(false) }} /></Col>
                        </Row>
                        :
                        <div key={keyComponent + "_input"} className="text-left">
                            <input
                                type="text"
                                className="border-2 border-amber-400 text-black w-1/3 rounded text-left pl-4"
                                defaultValue={nameComponent}
                                onBlur={(e) => {
                                    dispatch(updateName({ key: keyComponent, name: e.currentTarget.value }))
                                    setOutlinerItemVisibility(true)
                                }}
                            />
                        </div>
                )
            }
        </>

    )
}