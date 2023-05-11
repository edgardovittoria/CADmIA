import "./App.css";
import "./GlobalColors.css";
import { CadmiaCanvas } from "./components/canvas/cadmiaCanvas";
import { TransformationsToolBar } from "./components/transformationsToolbar/transformationsToolbar";
import { KeyboardEventMapper } from "./components/keyboardEventMapper";
import "react-statusbar/dist/statusbar.css";
import { SetUserInfo } from "cad-library";
import { BinaryOpsToolbar } from "./components/binaryOperationsToolbar/binaryOpsToolbar";
import { MiscToolbar } from "./components/miscToolbar/miscToolbar";
import { Navbar } from "./components/navBar/NavBar";
import { Sidebar } from "./components/sideBar/Sidebar";
import { StatusBar } from "./components/statusBar/statusBar";
import { ShapesToolbar } from "./components/navBar/components/componentsItems/shapeToolbar";
import { useSelector } from "react-redux";
import { binaryOpToolbarVisibilitySelector } from "./components/binaryOperationsToolbar/binaryOperationsToolbarSlice";
import { transformationsToolbarVisibilitySelector } from "./components/transformationsToolbar/toolbarTransformationSlice";
import { miscToolbarVisibilitySelector } from "./components/miscToolbar/miscToolbarSlice";
import { shapesToolbarVisibilitySelector } from "./components/navBar/components/componentsItems/shapesToolbarSlice";

function App() {
	const binaryOperationsToolbarVisible = useSelector(binaryOpToolbarVisibilitySelector)
	const transformationsToolbarVisible = useSelector(transformationsToolbarVisibilitySelector)
	const miscToolbarVisible = useSelector(miscToolbarVisibilitySelector)
	const ShapesToolbarVisible = useSelector(shapesToolbarVisibilitySelector)
	return (
		<>
			<div className="m-0 h-full">
				<SetUserInfo/>
				<Navbar/>
				<KeyboardEventMapper/>
				<div className="w-full p-0 relative">
					<CadmiaCanvas/>
					{transformationsToolbarVisible && <TransformationsToolBar />}
					{binaryOperationsToolbarVisible && <BinaryOpsToolbar />}
					{miscToolbarVisible && <MiscToolbar />}
					{ShapesToolbarVisible && <ShapesToolbar />}
					<Sidebar/>
				</div>
				<StatusBar />
			</div>
		</>
	);
}

export default App;
