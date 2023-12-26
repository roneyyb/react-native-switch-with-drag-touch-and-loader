import type { ReactElement } from "react";
import type { WorkletFunction } from "react-native-reanimated/lib/typescript/reanimated2/commonTypes";

export type TSwitchState = "right" | "left";

export interface ISwitchWithTouchAndDrag {
	switchChangeCallback: (
		...args: TSwitchState[]
	) => unknown | WorkletFunction<unknown[], unknown>;
	initialSwitchState: TSwitchState;
	switchWidth: number;
	switchBorderRadius: number;
	pieceWidth: number;
	switchHeight: number;
	switchBackgroundColor: string;
	switchBorderColor: string;
	pieceBackgroundColor: string;
	switchBorderWidth: number;
	pieceHeight: number;
	showLoader: boolean;
	switchType: TSwitchType;
	activityIndicatorComponent?: ReactElement;
	changeSwitchState: TSwitchState;
}

export type TSwitchType = "loading" | "normal";
