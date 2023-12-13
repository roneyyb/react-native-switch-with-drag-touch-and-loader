import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
    Easing,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import {
    Gesture,
    GestureDetector,
} from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';
import type { ISwitchWithTouchAndDrag, TSwitchState } from './types';


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
    updateSwitchError,
    updateSwitchLoading,
}: ISwitchWithTouchAndDrag) => {
    const [switchState, setSwitchState] = React.useState<TSwitchState>(
        changeSwitchState || 'left'
    );

    const trackWidth = switchWidth - pieceWidth;
    const trackEndCordinate = trackWidth - switchBorderWidth * 2 - 0.5;

    const pieceHeightWithCorrection = pieceHeight - switchBorderWidth * 2;

    const offset = useSharedValue(
        switchState === 'left' ? 0 : trackWidth - switchBorderWidth * 2
    );

    useEffect(() => {
        setSwitchState(changeSwitchState);
    }, [changeSwitchState]);

    useEffect(() => {
        if (updateSwitchError) {
            const finalCordinate = switchState === 'right' ? trackEndCordinate : 0;
            offset.value = withTiming(finalCordinate, {
                duration: 100,
                easing: Easing.linear,
            });
        }
    }, [updateSwitchError]);

    useEffect(() => {
        const finalCordinate = switchState == 'right' ? trackEndCordinate : 0
        offset.value = withTiming(finalCordinate, {
            duration: 100,
            easing: Easing.linear,
        })
        // Vibration.vibrate()
        return
    }, [switchState])

    const onClick = React.useCallback(() => {
        // const finalState = switchState == 'right' ? 'left' : 'right'

        // const finalCordinate = finalState == 'right' ? trackEndCordinate : 0
        // offset.value = withTiming(finalCordinate, {
        //   duration: 100,
        //   easing: Easing.linear,
        // })

        // if (switchState != finalState) {
        switchChangeCallback(switchState == 'right' ? 'left' : 'right')
        // }
        return
    }, [switchState])

    const pan = Gesture.Pan()
        .onBegin(() => {
            //pressed.value = true
        })
        .onChange((event) => {
            const currentPosition =
                switchState == 'right'
                    ? event.translationX + trackWidth
                    : event.translationX
            if (currentPosition >= trackWidth) {
                offset.value = trackEndCordinate
            } else if (currentPosition < 0) {
                offset.value = 0
            } else {
                offset.value += event.changeX
            }
        })
        .onFinalize((event) => {
            if (event.translationX == 0) {
                runOnJS(onClick)()
            } else {
                const finalState =
                    switchState == 'left'
                        ? event.translationX > trackWidth * (1 / 3)
                            ? 'right'
                            : 'left'
                        : event.translationX + trackWidth > trackWidth * (2 / 3)
                            ? 'right'
                            : 'left'
                const finalCordinate = finalState == 'right' ? trackEndCordinate : 0
                offset.value = withTiming(finalCordinate, {
                    duration: 100,
                    easing: Easing.linear,
                })
                runOnJS(switchChangeCallback)(finalState)
            }
            // offset.value = withSpring(0)
            //pressed.value = false
        })

    const firstTime = React.useRef(true)

    // React.useEffect(() => {
    //   if (firstTime.current) {
    //     firstTime.current = false
    //     return
    //   } else {
    //     swtichChangeCallBack(switchState)
    //   }
    // }, [switchState])

    const firstTimeInitial = React.useRef(true)

    // React.useEffect(() => {
    //   if (firstTimeInitial.current) {
    //     firstTimeInitial.current = false
    //   } else {
    //     // runOnJS(onClick)()
    //   }
    // }, [externalSwitchState])

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: offset.value,
            },
        ],
        backgroundColor: pieceBackgroundColor,
    }))

    const animatedStylesArrow = useAnimatedStyle(() => {
        const rotation = interpolate(
            offset.value,
            [0, trackEndCordinate],
            [-180, 0],
            {}
        )
        const rotateTransform = `${rotation}deg`

        return {
            transform: [{ rotate: rotateTransform }],
        }
    })

    return (
        <View
            style={[
                {
                    borderColor: switchBorderColor,
                    height: switchHeight,
                    width: switchWidth,
                    borderRadius: switchBorderRadius,
                    backgroundColor: switchBackgroundColor,
                    borderWidth: switchBorderWidth,
                },
            ]}
        >

            <Pressable
                style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                }}
                onPress={() => {
                    onClick()
                }}
            />
            <GestureDetector gesture={pan}>
                <Animated.View

                    style={[
                        {
                            borderRadius: switchBorderRadius,
                            width: pieceWidth,
                            height: pieceHeightWithCorrection,
                            backgroundColor: pieceBackgroundColor,
                            elevation: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                        animatedStyles,
                    ]}
                >
                    <Animated.View style={[{}, animatedStylesArrow]}>
                        {updateSwitchLoading ? <ActivityIndicator color='black' /> : <View />}
                    </Animated.View>
                </Animated.View>
            </GestureDetector>

        </View>
    )
}

export default SwitchWithTouchAndDrag
