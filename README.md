# react-native-switch-with-drag-touch-and-loader

Switch component in react native with behavious like touch, drag & loading for api or any side effect

## Installation

```sh
npm install react-native-switch-with-drag-touch-and-loader
```

## Usage

```js
import SwitchWithTouchAndDrag from 'react-native-switch-with-drag-touch-and-loader';

// ...

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
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
