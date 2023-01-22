import { FC, useState } from "react";
import { Statusbar } from "react-statusbar";

interface StatusBarProps {}

export const StatusBar: FC<StatusBarProps> = () => {
	const units = ["dm", "cm", "mm"];
	const [unit, setUnit] = useState("cm");
	return (
		<Statusbar
			placement="bottom"
			className="z-50"
			theme="light"
			right={
				<div className="row">
					<span>unit: </span>
					<select value={unit} onChange={(e) => setUnit(e.target.value)}>
						{units.map((u, index) => <option key={index} value={u}>{u}</option>)}
					</select>
				</div>
			}
		/>
	);
};
