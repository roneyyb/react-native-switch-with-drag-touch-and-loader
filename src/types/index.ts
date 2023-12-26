import type { WorkletFunction } from "react-native-reanimated/lib/typescript/reanimated2/commonTypes";

export type TSwitchState = "right" | "left";

export interface ISwitchWithTouchAndDrag {
	switchChangeCallback: (
		...args: unknown[]
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
	externalSwitchState: TSwitchState;
	changeSwitchState: TSwitchState;
	showLoader: boolean;
	switchType: TSwitchType;
}

export type TSwitchType = "loading" | "normal";
