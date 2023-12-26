import * as React from "react";

import SwitchWithTouchAndDrag from "react-native-switch-with-drag-touch-and-loader";

export default function App() {
	const [showLoading, setShowLoading] = React.useState<boolean>(false);
	const [switchStateOutside, setSwitchStateOutside] = React.useState<
		"right" | "left"
	>("left");
	const anyAsyncWork = (state: any) =>
		new Promise((resolve, reject) => {
			if (state === "right") {
				resolve("Done");
			} else if (state === "left") {
				reject("");
			}
		});

	return (
		<SwitchWithTouchAndDrag
			switchBackgroundColor='rgba(0, 0, 0,1);'
			switchBorderColor={"rgba(255, 255, 255, 0.4)"}
			pieceBackgroundColor='#FFFFFF'
			switchBorderWidth={2}
			pieceWidth={30}
			pieceHeight={30}
			switchHeight={30}
			switchWidth={70}
			switchBorderRadius={30}
			switchChangeCallback={(state: "right" | "left") => {
				setShowLoading(true);
				anyAsyncWork(state === "right" ? true : false)
					.then(() => {
						setSwitchStateOutside(state);
						setShowLoading(false);
					})
					.catch(() => {
						setSwitchStateOutside(state === "right" ? "left" : "right");
						setShowLoading(false);
					});
			}}
			initialSwitchState={"right"}
			switchType={"loading"}
			showLoader={showLoading}
			changeSwitchState={switchStateOutside}
		/>
	);
}
