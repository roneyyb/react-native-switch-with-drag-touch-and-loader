import React, { useEffect } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import Animated, {
	Easing,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";
import type { ISwitchWithTouchAndDrag, TSwitchState } from "./types";
import useEffectWithoutFirstRendering from "./hooks/useEffectWithoutFirstRendering";

const SwitchWithTouchAndDrag = ({
	switchChangeCallback,
	changeSwitchState,
	switchWidth,
	switchBorderRadius,
	switchHeight,
	pieceWidth,
	switchBackgroundColor,
	switchBorderColor,
	pieceBackgroundColor,
	switchBorderWidth,
	pieceHeight,
	showLoader,
	switchType,
	initialSwitchState,
	activityIndicatorComponent
}: ISwitchWithTouchAndDrag) => {
	if (switchType === "loading") {
		if (typeof showLoader !== "boolean") {
			throw new Error(
				"Please provide switch loading state. Since you have mentioned switchType as loading"
			);
		} else if (changeSwitchState !== "right" && changeSwitchState !== "left") {
			throw new Error(
				"Please provide changeSwitchState. Since you have mentioned switchType as loading"
			);
		}
	}

	const [switchState, setSwitchState] = React.useState<TSwitchState>(
		initialSwitchState || "left"
	);

	const trackWidth = switchWidth - pieceWidth;
	const trackEndCordinate = trackWidth - switchBorderWidth * 2 - 0.5;

	const pieceHeightWithCorrection = pieceHeight - switchBorderWidth * 2;

	const offset = useSharedValue(
		switchState === "left" ? 0 : trackWidth - switchBorderWidth * 2
	);

	useEffectWithoutFirstRendering(() => {
		if (changeSwitchState) {
			setSwitchState(changeSwitchState);
		}
	}, [changeSwitchState]);

	useEffect(() => {
		const finalCordinate = switchState === "right" ? trackEndCordinate : 0;
		offset.value = withTiming(finalCordinate, {
			duration: 100,
			easing: Easing.linear
		});
		// Vibration.vibrate()
		return;
	}, [switchState, offset, trackEndCordinate]);

	const onClick = React.useCallback(() => {
		if (switchType === "loading") {
			switchChangeCallback(switchState === "right" ? "left" : "right");
		} else {
			setSwitchState(switchState === "right" ? "left" : "right");
		}
	}, [switchState, switchChangeCallback, switchType]);

	const pan = Gesture.Pan()
		.onBegin(() => {
			//pressed.value = true
		})
		.onChange((event: any) => {
			const currentPosition =
				switchState === "right"
					? event.translationX + trackWidth
					: event.translationX;
			if (currentPosition >= trackWidth) {
				offset.value = trackEndCordinate;
			} else if (currentPosition < 0) {
				offset.value = 0;
			} else {
				offset.value += event.changeX;
			}
		})
		.onFinalize((event: any) => {
			if (event.translationX === 0) {
				runOnJS(onClick)();
			} else {
				const finalState =
					switchState === "left"
						? event.translationX > trackWidth * (1 / 3)
							? "right"
							: "left"
						: event.translationX + trackWidth > trackWidth * (2 / 3)
						? "right"
						: "left";
				const finalCordinate = finalState === "right" ? trackEndCordinate : 0;
				offset.value = withTiming(finalCordinate, {
					duration: 100,
					easing: Easing.linear
				});
				setSwitchState(finalState);
				runOnJS(switchChangeCallback)(finalState);
			}
		});

	const animatedStyles = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: offset.value
			}
		],
		backgroundColor: pieceBackgroundColor
	}));

	const animatedStylesArrow = useAnimatedStyle(() => {
		const rotation = interpolate(
			offset.value,
			[0, trackEndCordinate],
			[-180, 0],
			{}
		);
		const rotateTransform = `${rotation}deg`;

		return {
			transform: [{ rotate: rotateTransform }]
		};
	});

	return (
		<View
			style={[
				{
					borderColor: switchBorderColor,
					height: switchHeight,
					width: switchWidth,
					borderRadius: switchBorderRadius,
					backgroundColor: switchBackgroundColor,
					borderWidth: switchBorderWidth
				}
			]}>
			<Pressable
				style={styles.touchContainerStyle}
				onPress={() => {
					onClick();
				}}
			/>
			<GestureDetector gesture={pan}>
				<Animated.View
					style={[
						{
							borderRadius: switchBorderRadius,
							width: pieceWidth,
							height: pieceHeightWithCorrection,
							backgroundColor: pieceBackgroundColor
						},
						styles.pieceContainerStyle,
						animatedStyles
					]}>
					<Animated.View style={[{}, animatedStylesArrow]}>
						{showLoader ? (
							activityIndicatorComponent ? (
								activityIndicatorComponent
							) : (
								<ActivityIndicator size={pieceHeight - 2} color='black' />
							)
						) : (
							<View />
						)}
					</Animated.View>
				</Animated.View>
			</GestureDetector>
		</View>
	);
};

const styles = StyleSheet.create({
	touchContainerStyle: {
		height: "100%",
		width: "100%",
		position: "absolute"
	},
	pieceContainerStyle: {
		elevation: 5,
		alignItems: "center",
		justifyContent: "center"
	}
});

export default SwitchWithTouchAndDrag;
