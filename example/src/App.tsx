import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SwitchWithTouchAndDrag from "react-native-switch-with-drag-touch-and-loader";

export default function App() {
	const [showLoading, setShowLoading] = React.useState<boolean>(false);
	const [switchStateWithLoader, setSwitchStateWithLoader] = React.useState<
		"right" | "left"
	>("left");
	const [switchStateNormal, setSwitchStateNormal] = React.useState<
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
			<Text>
				{
					"switchChangeCallback always tells about the next state\nFor loading switch you will have control for switch state\n\n"
				}
			</Text>

			<Text style={{ fontSize: 16 }}>SWITCH WITH LOADING</Text>
			<Text style={{ fontSize: 12 }}>
				In this switch you have to provide switchType as loading and switchState
				will always depend on outside switch state
			</Text>
			<View style={{ marginTop: 10 }} />
			<View style={{ flexDirection: "row" }}>
				<SwitchWithTouchAndDrag
					switchBackgroundColor={
						switchStateWithLoader === "right" ? "#50C878" : "rgba(0, 0, 0,0.4);"
					}
					switchBorderColor={"rgba(255, 255, 255, 0.4)"}
					pieceBackgroundColor={"#FFFFFF"}
					switchBorderWidth={2}
					pieceWidth={40}
					pieceHeight={40}
					switchHeight={41}
					switchWidth={90}
					switchBorderRadius={50}
					initialSwitchState={"right"}
					activityIndicatorColor={"rgba(0, 0, 0,0.4);"}
					switchType={"loading"}
					switchChangeCallback={(state: "right" | "left") => {
						setSwitchStateWithLoader(state);
						setShowLoading(true);
						anyAsyncWork(state)
							.then(() => {
								// In case of success update it to next State
								setSwitchStateWithLoader(state);
								setShowLoading(false);
							})
							.catch(() => {
								// In case of failure update it to previous state
								setSwitchStateWithLoader(state === "right" ? "left" : "right");
								setShowLoading(false);
							});
					}}
					showLoader={showLoading}
					changeSwitchState={switchStateWithLoader}
				/>
			</View>
			<View style={{ marginTop: 10 }} />

			<Text style={{ fontSize: 16 }}>NORMAL SWITCH</Text>

			<View style={{ marginTop: 10 }} />
			<SwitchWithTouchAndDrag
				switchBackgroundColor={
					switchStateNormal === "right" ? "#22733D" : "rgba(0, 0, 0,0.3);"
				}
				switchBorderColor={"rgba(255, 255, 255, 0.4)"}
				pieceBackgroundColor="#FFFFFF"
				switchBorderWidth={2}
				pieceWidth={35}
				pieceHeight={35}
				switchHeight={35}
				switchWidth={80}
				switchBorderRadius={30}
				initialSwitchState={"right"}
				switchType={"normal"}
				switchChangeCallback={(state: "right" | "left") => {
					setSwitchStateNormal(state);
				}}
			/>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	containerStyle: { flex: 1, alignItems: "center", justifyContent: "center" }
});
