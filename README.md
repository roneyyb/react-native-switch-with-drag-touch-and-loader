# react-native-switch-with-drag-touch-and-loader

Switch component in react native with behavious like touch, drag & loading for api or any side effect

## Installation

```sh
yarn add react-native-switch-with-drag-touch-and-loader
```

## Usage

```js
import SwitchWithTouchAndDrag from 'react-native-switch-with-drag-touch-and-loader';

// ...

// Without loading

const [switchStateOutside, setSwitchStateOutside] = React.useState<
"right" | "left"
>("left");

return (
<>
	{switchStateOutside === "left" ? <View /> : <View />}
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
			setSwitchStateOutside(state);
		}}
		initialSwitchState={"left"}
		switchType={"normal"}
	/>
	{switchStateOutside === "right" ? <View /> : <View />}
</>
);

//With loading

import * as React from "react";

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

```

| Property                  | Description                                                                   | Type                                                   | Example Value      | Mandatory / Optional |
|---------------------------|-------------------------------------------------------------------------------|--------------------------------------------------------|--------------------|----------------------|
| switchChangeCallback      | Callback function triggered when the switch state changes.                     | `(...args: TSwitchState[]) => unknown \| WorkletFunction<unknown[], unknown>` | `(newValue) => console.log('Switch changed:', newValue)` | Mandatory            |
| initialSwitchState        | Initial state of the switch (either "right" or "left").                         | `TSwitchState` (enum: "right" \| "left")               | `"left"`           | Mandatory            |
| switchWidth               | Width of the entire switch component.                                           | `number`                                               | `200`              | Mandatory            |
| switchBorderRadius        | Border radius of the switch component.                                          | `number`                                               | `10`               | Mandatory            |
| pieceWidth                | Width of the draggable switch piece.                                             | `number`                                               | `50`               | Mandatory            |
| switchHeight              | Height of the switch component.                                                  | `number`                                               | `40`               | Mandatory            |
| switchBackgroundColor     | Background color of the switch component.                                        | `string` (color value)                                 | `"#3498db"`        | Mandatory            |
| switchBorderColor         | Border color of the switch component.                                            | `string` (color value)                                 | `"#000"`           | Mandatory            |
| pieceBackgroundColor      | Background color of the draggable switch piece.                                  | `string` (color value)                                 | `"#ffffff"`        | Mandatory            |
| switchBorderWidth         | Border width of the switch component.                                            | `number`                                               | `2`                | Mandatory            |
| pieceHeight               | Height of the draggable switch piece.                                            | `number`                                               | `30`               | Mandatory            |
| showLoader                | Boolean determining whether to display a loader when the switch is in loading state. | `boolean`                                              | `true` or `false`  | Optional             |
| switchType                | Type of switch, either "loading" or "normal".                                   | `TSwitchType` (enum: "loading" \| "normal")            | `"normal"`         | Mandatory            |
| activityIndicatorComponent | Optional React component to display as an activity indicator when `showLoader` is true. | `ReactElement`                                      | `<ActivityIndicator />` | Optional             |
| changeSwitchState         | Desired state to change the switch programmatically.                             | `TSwitchState` (enum: "right" \| "left")               | `"right"`          | Optional             |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
