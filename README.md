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

<SwitchWithTouchAndDrag
    switchBackgroundColor="rgba(0, 0, 0,1);"
    switchBorderColor={'rgba(255, 255, 255, 0.4)'}
    pieceBackgroundColor="#FFFFFF"
    switchBorderWidth={2}
    pieceWidth={30}
    pieceHeight={30}
    switchHeight={30}
    switchWidth={70}
    switchBorderRadius={30}
    switchChangeCallback={(state) => {
        switchStateChangeCallback(state == 'right' ? true : false)
    }}
    switchtype={"normal"}
/>

//With loading

const [showLoading,setShowLoading] = React.useState(false);
const [switchStateOutside,setSwitchStateOutside] = React.useState("left");
const anyAsyncWork = (state) => new Promise((resolve,reject) => {
    if(state=="right") {
        resolve("Done");
    } else if(state=="left"){
        reject("")
    }
})

<SwitchWithTouchAndDrag
    switchBackgroundColor="rgba(0, 0, 0,1);"
    switchBorderColor={'rgba(255, 255, 255, 0.4)'}
    pieceBackgroundColor="#FFFFFF"
    switchBorderWidth={2}
    pieceWidth={30}
    pieceHeight={30}
    switchHeight={30}
    switchWidth={70}
    switchBorderRadius={30}
    switchChangeCallback={(state) => {
        setShowLoading(true);
        anyAsyncWork(state).then(() => {
            setSwitchStateOutside(state)
            setShowLoading(false)
        }).catch(() => {
            setSwitchStateOutside(state=="right"?"left":"right")
            setShowLoading(false)
        })
    }}
    switchtype={"loading"}
    showLoading={showLoading}
    changeSwitchState={switchStateOutside}
/>

```

| Property                  | Description                                                                                                      | Type                                                         | Example Value             |
|---------------------------|------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|---------------------------|
| switchChangeCallback      | Callback function triggered when the switch state changes.                                                          | `(...args: unknown[]) => unknown \| WorkletFunction<unknown[], unknown>` | `(newValue) => console.log('Switch changed:', newValue)` |
| initialSwitchState        | Initial state of the switch (either "right" or "left").                                                            | `TSwitchState` (enum: "right" \| "left")                      | `"left"`                  |
| switchWidth               | Width of the entire switch component.                                                                              | `number`                                                     | `200`                     |
| switchBorderRadius        | Border radius of the switch component.                                                                            | `number`                                                     | `10`                      |
| pieceWidth                | Width of the draggable switch piece.                                                                               | `number`                                                     | `50`                      |
| switchHeight              | Height of the switch component.                                                                                    | `number`                                                     | `40`                      |
| switchBackgroundColor     | Background color of the switch component.                                                                          | `string` (color value)                                       | `"#3498db"`               |
| switchBorderColor         | Border color of the switch component.                                                                              | `string` (color value)                                       | `"#000"`                  |
| pieceBackgroundColor      | Background color of the draggable switch piece.                                                                    | `string` (color value)                                       | `"#ffffff"`               |
| switchBorderWidth         | Border width of the switch component.                                                                              | `number`                                                     | `2`                       |
| pieceHeight               | Height of the draggable switch piece.                                                                              | `number`                                                     | `30`                      |
| externalSwitchState       | External state of the switch component.                                                                            | `TSwitchState` (enum: "right" \| "left")                      | `"right"`                 |
| showLoader                | Boolean determining whether to display a loader when the switch is in the loading state.                           | `boolean`                                                    | `true` or `false`         |
| switchType                | Type of switch, either "loading" or "normal".                                                                     | `TSwitchType` (enum: "loading" \| "normal")                   | `"normal"`                |
| activityIndicatorComponent | Optional React component to display as an activity indicator when `showLoader` is true.                            | `ReactElement` (optional)                                    | `<ActivityIndicator />`   |
| changeSwitchState         | Desired state to change the switch to programmatically.                                                            | `TSwitchState` (enum: "right" \| "left")                      | `"right"`                 |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
