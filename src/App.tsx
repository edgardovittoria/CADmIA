import {useState} from "react";
import "./App.css";
import "./GlobalColors.css";
import {MyCanvas} from "./components/canvas/MyCanvas";
import {ToolBar} from "./components/toolBar";
import {KeyboardEventMapper} from "./components/keyboardEventMapper";
import "react-statusbar/dist/statusbar.css";
import * as Statusbar from "react-statusbar";
import {
    SetUserInfo,
} from "cad-library";
import {BinaryOpsToolbar} from "./components/binaryOperationsToolbar/binaryOpsToolbar";
import {MiscToolbar} from "./components/miscToolbar";
import {Navbar} from "./components/navBar/NavBar";
import {Sidebar} from "./components/sideBar/Sidebar";

export let token = "";
export type borderFlagComponent = {
    componentKey: number,
    borders: boolean
}

function App() {
    const [sideBar, setSideBar] = useState(false);
    const [unit, setUnit] = useState("cm");
    const [borders, setBorders] = useState<borderFlagComponent[]>([])
    const setBorderForComponent = (componentKey: number, bordersVisible: boolean) => {
        let newBorders = borders.filter(borderFlag => borderFlag.componentKey !== componentKey)
        newBorders.push({componentKey: componentKey, borders: bordersVisible})
        setBorders(newBorders)
    }

    return (
        <>
            <div className="m-0 h-full">
                <SetUserInfo/>
                <Navbar
                    sideBarChecked={sideBar}
                    setSideBarChecked={setSideBar}
                />
                <KeyboardEventMapper
                    sideBarChecked={sideBar}
                    setSideBarChecked={setSideBar}
                />
                <div className="w-full p-0 relative">
                    <MyCanvas bordersVisible={borders}/>
                    <ToolBar/>
                    <BinaryOpsToolbar/>
                    <MiscToolbar/>
                    <Sidebar sideBarVisibility={sideBar} setSideBarVisibility={setSideBar}
                             bordersVisible={borders} setBorderForComponent={setBorderForComponent}/>

                </div>
                <Statusbar.Statusbar
                    placement="bottom"
                    className="z-50"
                    theme="light"
                    right={
                        <Statusbar.Dropdown
                            options={[
                                {
                                    key: "dm",
                                    label: "dm",
                                    onClick: () => setUnit("dm"),
                                },
                                {
                                    key: "cm",
                                    label: "cm",
                                    onClick: () => setUnit("cm"),
                                },
                                {
                                    key: "separator-test",
                                    type: "separator",
                                },
                                {
                                    key: "mm",
                                    label: "mm",
                                    onClick: () => setUnit("mm"),
                                },
                            ]}
                        >
                            units: {unit}
                        </Statusbar.Dropdown>
                    }
                />
            </div>
        </>
    );
}

export default App;
