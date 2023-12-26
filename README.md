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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
