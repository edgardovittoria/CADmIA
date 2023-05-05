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
import { StatusBar } from "./components/statusBar/statusBar";
import { ShapesToolbar } from "./components/navBar/components/componentsItems/shapesToolbar/shapeToolbar";

function App() {
	return (
		<>
			<div className="m-0 h-full">
				<SetUserInfo/>
				<Navbar/>
				<KeyboardEventMapper/>
				<div className="w-full p-0 relative">
					<CadmiaCanvas/>
					<TransformationsToolBar />
					<BinaryOpsToolbar />
					<MiscToolbar />
					<ShapesToolbar />
					<Sidebar/>
				</div>
				<StatusBar />
			</div>
		</>
	);
}

export default App;
