import * as React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SwitchWithTouchAndDrag from "react-native-switch-with-drag-touch-and-loader";

export default function App() {
	const [showLoading, setShowLoading] = React.useState<boolean>(false);
	const [switchStateOutside, setSwitchStateOutside] = React.useState<
		"right" | "left"
	>("left");
	const anyAsyncWork = (state: any) =>
		new Promise((resolve, reject) => {
			console.log(state, "promise");
			if (state === "right" || state === "left") {
				setTimeout(() => {
					resolve("Done");
				}, 500);
			} else {
				reject("");
			}
		});

	return (
		<GestureHandlerRootView style={styles.containerStyle}>
			<SwitchWithTouchAndDrag
				switchBackgroundColor="rgba(0, 0, 0,1);"
				switchBorderColor={"rgba(255, 255, 255, 0.4)"}
				pieceBackgroundColor="#FFFFFF"
				switchBorderWidth={2}
				pieceWidth={30}
				pieceHeight={30}
				switchHeight={30}
				switchWidth={100}
				switchBorderRadius={30}
				initialSwitchState={"right"}
				switchType={"normal"}
				switchChangeCallback={(state: "right" | "left") => {
					// setSwitchStateOutside(state);
					setSwitchStateOutside(state);
					setShowLoading(true);
					anyAsyncWork(state)
						.then(() => {
							setSwitchStateOutside(state);
							setShowLoading(false);
						})
						.catch(() => {
							setSwitchStateOutside(state === "right" ? "left" : "right");
							setShowLoading(false);
						});
				}}
				showLoader={showLoading}
				changeSwitchState={switchStateOutside}
			/>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	containerStyle: { flex: 1, alignItems: "center", justifyContent: "center" }
});
