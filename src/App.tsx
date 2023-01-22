import { useState } from "react";
import "./App.css";
import "./GlobalColors.css";
import { CadmiaCanvas } from "./components/canvas/cadmiaCanvas";
import { TransformationsToolBar } from "./components/transformationsToolbar/transformationsToolbar";
import { KeyboardEventMapper } from "./components/keyboardEventMapper";
import "react-statusbar/dist/statusbar.css";
import { SetUserInfo } from "cad-library";
import { BinaryOpsToolbar } from "./components/binaryOperationsToolbar/binaryOpsToolbar";
import { MiscToolbar } from "./components/miscToolbar";
import { Navbar } from "./components/navBar/NavBar";
import { Sidebar } from "./components/sideBar/Sidebar";
import { StatusBar } from "./components/statusBar";

export type borderFlagComponent = {
	componentKey: number;
	borders: boolean;
};

function App() {
	const [sideBar, setSideBar] = useState(false);
	const toggleSidebar = () => setSideBar(!sideBar)
	const [borders, setBorders] = useState<borderFlagComponent[]>([]);
	const setBorderForComponent = (
		componentKey: number,
		bordersVisible: boolean
	) => {
		let newBorders = borders.filter(
			(borderFlag) => borderFlag.componentKey !== componentKey
		);
		newBorders.push({ componentKey: componentKey, borders: bordersVisible });
		setBorders(newBorders);
	};

	return (
		<>
			<div className="m-0 h-full">
				<SetUserInfo />
				<Navbar sideBarChecked={sideBar} setSideBarChecked={setSideBar} />
				<KeyboardEventMapper toggleSidebar={toggleSidebar}/>
				<div className="w-full p-0 relative">
					<CadmiaCanvas bordersVisible={borders} />
					<TransformationsToolBar />
					<BinaryOpsToolbar />
					<MiscToolbar />
					<Sidebar
						sideBarVisibility={sideBar}
						setSideBarVisibility={setSideBar}
						bordersVisible={borders}
						setBorderForComponent={setBorderForComponent}
					/>
				</div>
				<StatusBar />
			</div>
		</>
	);
}

export default App;
