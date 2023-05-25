import { Dialog, Transition } from "@headlessui/react"
import { useFaunaQuery } from "cad-library"
import { FC, Fragment, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { ChromePicker } from "react-color"
import faunadb from "faunadb"

export const AddNewMaterialModal: FC<{ showModal: Function }> = ({ showModal }) => {
    const { execQuery } = useFaunaQuery()
    const [name, setName] = useState("")
    const [color, setColor] = useState("#333")
    const [permeability, setPermeability] = useState<number|undefined>(undefined)
    const [tangentDeltaPermeability, setTangentDeltaPermeability] = useState<number | undefined>(undefined)
    const [customPermeability, setCustomPermeability] = useState<[number | undefined, number | undefined]>([undefined, undefined])
    const [permittivity, setPermittivity] = useState<number|undefined>(undefined)
    const [tangentDeltaPermittivity, setTangentDeltaPermittivity] = useState<number | undefined>(undefined)
    const [customPermittivity, setCustomPermittivity] = useState<[number | undefined, number | undefined]>([undefined, undefined])
    const [conductivity, setConductivity] = useState<number|undefined>(undefined)
    const [tangentDeltaConductivity, setTangentDeltaConductivity] = useState<number | undefined>(undefined)
    const [customConductivity, setCustomConductivity] = useState<[number | undefined, number | undefined]>([undefined, undefined])
    const [valueErrorMessage, setValueErrorMessage] = useState<string | undefined>(undefined)
    const [saveMaterialFlag, setSaveMaterialFlag] = useState(false)

    type FaunaMaterial = {
        name: string;
        color: string;
        permeability: number;
        tangent_delta_permeability?: number;
        custom_permeability?: [number, number];
        permittivity: number;
        tangent_delta_permittivity?: number;
        custom_permittivity?: [number, number];
        conductivity: number;
        tangent_delta_conductivity?: number;
        custom_conductivity?: [number, number];
    }

    async function saveNewMaterial(faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, newMaterial: FaunaMaterial) {
        try {
            await faunaClient.query((
                faunaQuery.Create(
                    faunaQuery.Collection('Materials'),
                    {
                        data: {
                            ...newMaterial
                        }
                    }
                )
            ))
            toast.success("Material successfully saved!")
        } catch (e) {
            toast.error("Material not saved! See console log for error details.")
            console.log(e)
        }
    }

    const checkForValueErrors = () => {
        let error = undefined
        if (name === "") {
            error = "You must insert a valid name for the new material."
        }
        else if (!permeability) {
            error = "You must insert a permeability value."
        }
        else if (!permittivity) {
            error = "You must insert a permittivity value."
        }
        else if (!conductivity) {
            error = "You must insert a conductivity value."
        }
        else if ((customPermeability[0] && !customPermeability[1]) || (!customPermeability[0] && customPermeability[1])) {
            error = "You must insert valid custom permeability values."
        }
        else if ((customPermittivity[0] && !customPermittivity[1]) || (!customPermittivity[0] && customPermittivity[1])) {
            error = "You must insert valid custom permittivity values."
        }
        else if ((customConductivity[0] && !customConductivity[1]) || (!customConductivity[0] && customConductivity[1])) {
            error = "You must insert valid custom conductivity values."
        }
        
        if(error !== undefined){
            setValueErrorMessage(error)
            setSaveMaterialFlag(false)
        }
        else{
            setValueErrorMessage(error)
            setSaveMaterialFlag(true)
        }
    }

    useEffect(() => {
        if(valueErrorMessage){
            toast.error(valueErrorMessage)
            setValueErrorMessage(undefined)
        }
    }, [valueErrorMessage])

    useEffect(() => {
        if(saveMaterialFlag){
            setSaveMaterialFlag(false)
            showModal(false)
            execQuery(saveNewMaterial, {
                name: name,
                color: color,
                permeability: permeability,
                tangent_delta_permeability: tangentDeltaPermeability,
                custom_permeability: customPermeability[0] ? customPermeability : undefined,
                permittivity: permittivity,
                tangent_delta_permittivity: tangentDeltaPermittivity,
                custom_permittivity: customPermittivity[0] ? customPermittivity : undefined,
                conductivity: conductivity,
                tangent_delta_conductivity: tangentDeltaConductivity,
                custom_conductivity: customConductivity[0] ? customConductivity : undefined
            } as FaunaMaterial)
        }
    }, [saveMaterialFlag])


    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => showModal(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Add new material to database
                                </Dialog.Title>
                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <label className="ml-2">Name:</label>
                                        <input
                                            type="text"
                                            value={name}
                                            required
                                            onChange={(e) => { setName(e.target.value) }}
                                            className="border border-black rounded shadow p-1 w-[80%] text-black text-left"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <label className="ml-2">Color:</label>
                                        <ChromePicker
                                            color={color}
                                            onChangeComplete={(color) => setColor(color.hex)}
                                            disableAlpha={true}
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <label className="ml-2">Permeability:</label>
                                        <input
                                            type="number"
                                            step={0.00001}
                                            value={permeability}
                                            required
                                            onChange={(e) => { setPermeability(!Number.isNaN(parseFloat(e.target.value)) ? parseFloat(e.target.value) : undefined) }}
                                            className="border border-black rounded shadow p-1 w-[80%] text-black text-left"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <label className="ml-2">Tangent Delta Permeability:</label>
                                        <input
                                            type="number"
                                            step={0.00001}
                                            value={tangentDeltaPermeability}
                                            onChange={(e) => { setTangentDeltaPermeability(!Number.isNaN(parseFloat(e.target.value)) ? parseFloat(e.target.value) : undefined) }}
                                            className="border border-black rounded shadow p-1 w-[80%] text-black text-left"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <label className="ml-2">Custom Permeability:</label>
                                        <input
                                            type="number"
                                            step={0.00001}
                                            value={customPermeability[0]}
                                            onChange={(e) => { setCustomPermeability([!Number.isNaN(parseFloat(e.target.value)) ? parseFloat(e.target.value) : undefined, customPermeability[1]]) }}
                                            className="border border-black rounded shadow p-1 w-[50%] text-black text-left"
                                        />
                                        <input
                                            type="number"
                                            step={0.00001}
                                            value={customPermeability[1]}
                                            onChange={(e) => { setCustomPermeability([customPermeability[0], !Number.isNaN(parseFloat(e.target.value)) ? parseFloat(e.target.value) : undefined]) }}
                                            className="border border-black rounded shadow p-1 w-[50%] text-black text-left"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <label className="ml-2">Permittivity:</label>
                                        <input
                                            type="number"
                                            step={0.00001}
                                            value={permittivity}
                                            required
                                            onChange={(e) => { setPermittivity(!Number.isNaN(parseFloat(e.target.value)) ? parseFloat(e.target.value) : undefined) }}
                                            className="border border-black rounded shadow p-1 w-[80%] text-black text-left"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <label className="ml-2">Tangent Delta Permittivity:</label>
                                        <input
                                            type="number"
                                            step={0.00001}
                                            value={tangentDeltaPermittivity}
                                            onChange={(e) => { setTangentDeltaPermittivity(!Number.isNaN(parseFloat(e.target.value)) ? parseFloat(e.target.value) : undefined) }}
                                            className="border border-black rounded shadow p-1 w-[80%] text-black text-left"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <label className="ml-2">Custom Permittivity:</label>
                                        <input
                                            type="number"
                                            step={0.00001}
                                            value={customPermittivity[0]}
                                            onChange={(e) => { setCustomPermittivity([!Number.isNaN(parseFloat(e.target.value)) ? parseFloat(e.target.value) : undefined, customPermittivity[1]]) }}
                                            className="border border-black rounded shadow p-1 w-[50%] text-black text-left"
                                        />
                                        <input
                                            type="number"
                                            step={0.00001}
                                            value={customPermittivity[1]}
                                            onChange={(e) => { setCustomPermittivity([customPermittivity[0], !Number.isNaN(parseFloat(e.target.value)) ? parseFloat(e.target.value) : undefined]) }}
                                            className="border border-black rounded shadow p-1 w-[50%] text-black text-left"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <label className="ml-2">Conductivity:</label>
                                        <input
                                            type="number"
                                            step={0.00001}
                                            value={conductivity}
                                            required
                                            onChange={(e) => { setConductivity(!Number.isNaN(parseFloat(e.target.value)) ? parseFloat(e.target.value) : undefined) }}
                                            className="border border-black rounded shadow p-1 w-[80%] text-black text-left"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <label className="ml-2">Tangent Delta Conductivity:</label>
                                        <input
                                            type="number"
                                            step={0.00001}
                                            value={tangentDeltaConductivity}
                                            onChange={(e) => { setTangentDeltaConductivity(!Number.isNaN(parseFloat(e.target.value)) ? parseFloat(e.target.value) : undefined) }}
                                            className="border border-black rounded shadow p-1 w-[80%] text-black text-left"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <label className="ml-2">Custom Conductivity:</label>
                                        <input
                                            type="number"
                                            step={0.00001}
                                            value={customConductivity[0]}
                                            onChange={(e) => { setCustomConductivity([!Number.isNaN(parseFloat(e.target.value)) ? parseFloat(e.target.value) : undefined, customConductivity[1]]) }}
                                            className="border border-black rounded shadow p-1 w-[50%] text-black text-left"
                                        />
                                        <input
                                            type="number"
                                            step={0.00001}
                                            value={customConductivity[1]}
                                            onChange={(e) => { setCustomConductivity([customConductivity[0], !Number.isNaN(parseFloat(e.target.value)) ? parseFloat(e.target.value) : undefined]) }}
                                            className="border border-black rounded shadow p-1 w-[50%] text-black text-left"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-between">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={() => showModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={() => checkForValueErrors()}
                                    >
                                        Add
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}