import { FC, useState } from "react";
import { Statusbar } from "react-statusbar";
import {useDispatch, useSelector} from "react-redux";
import {setUnit, unitSelector} from "./statusBarSlice";

interface StatusBarProps {}

export const StatusBar: FC<StatusBarProps> = () => {
	const units = ["dm", "cm", "mm"];
	const unit = useSelector(unitSelector)
	const dispatch = useDispatch()
	return (
		<Statusbar
			placement="bottom"
			className="z-50"
			theme="light"
			right={
				<div className="row">
					<span>unit: </span>
					<select value={unit} onChange={(e) => dispatch(setUnit(e.target.value))}>
						{units.map((u, index) => <option key={index} value={u}>{u}</option>)}
					</select>
				</div>
			}
		/>
	);
};
