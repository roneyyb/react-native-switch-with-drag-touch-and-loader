export type TSwitchState = 'right' | 'left';

export interface ISwitchWithTouchAndDrag {
    switchChangeCallback: Function;
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
    updateSwitchError: boolean;
    updateSwitchLoading: boolean;
}
