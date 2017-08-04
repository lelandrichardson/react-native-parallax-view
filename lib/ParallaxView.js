'use strict';

import React, { Component } from 'react';
import ReactNative from 'react-native';
const {
    Dimensions,
    StyleSheet,
    View,
    ScrollView,
    Animated,
    } = ReactNative;

const BlurView = require('react-native-blur').BlurView;
const ScrollableMixin = require('react-native-scrollable-mixin');
const screen = Dimensions.get('window');
const ScrollViewPropTypes = ScrollView.propTypes;

export default class ParallaxView extends Component {
    mixins: [ScrollableMixin]

    constructor(props) {
        super(props)
        const scrollY = new Animated.Value(0);
        this.state = {
            scrollY,
            onScroll: Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }]
            )
        };
    }

    /**
     * IMPORTANT: You must return the scroll responder of the underlying
     * scrollable component from getScrollResponder() when using ScrollableMixin.
     */
    getScrollResponder() {
        return this._scrollView.getScrollResponder();
    }

    setNativeProps(props) {
        this._scrollView.setNativeProps(props);
    }

    renderBackground() {
        var { windowHeight, backgroundSource, blur } = this.props;
        var { scrollY } = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }
        return (
            <Animated.Image
                style={[styles.background, {
                    height: windowHeight,
                    transform: [{
                        translateY: scrollY.interpolate({
                            inputRange: [-windowHeight, 0, windowHeight],
                            outputRange: [windowHeight / 2, 0, -windowHeight / 3]
                        })
                    }, {
                        scale: scrollY.interpolate({
                            inputRange: [-windowHeight, 0, windowHeight],
                            outputRange: [2, 1, 1]
                        })
                    }]
                }]}
                source={backgroundSource}>
                {
                    !!blur && (BlurView || (BlurView = require('react-native-blur').BlurView)) &&
                    <BlurView blurType={blur} style={styles.blur} />
                }
            </Animated.Image>
        );
    }

    renderHeader() {
        var { windowHeight, backgroundSource } = this.props;
        var { scrollY } = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }
        return (
            <Animated.View style={{
                position: 'relative',
                height: windowHeight,
                opacity: scrollY.interpolate({
                    inputRange: [-windowHeight, 0, windowHeight / 1.2],
                    outputRange: [1, 1, 0]
                }),
            }}>
                {this.props.header}
            </Animated.View>
        );
    }

    render() {
        var { style } = this.props;
        var onScroll = this.props.onScroll ? e => {
            this.props.onScroll(e);
            this.state.onScroll(e);
        } : this.state.onScroll;
        return (
            <View style={[styles.container, style]}>
                {this.renderBackground()}
                <ScrollView
                    ref={component => { this._scrollView = component; }}
                    {...this.props}
                    style={styles.scrollView}
                    onScroll={onScroll}
                    scrollEventThrottle={16}>
                    {this.renderHeader()}
                    <View style={[styles.content, this.props.scrollableViewStyle]}>
                        {this.props.children}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

ParallaxView.propTypes = {
    ...ScrollViewPropTypes,
    windowHeight: React.PropTypes.number,
    backgroundSource: React.PropTypes.oneOfType([
        React.PropTypes.shape({
            uri: React.PropTypes.string,
        }),
        React.PropTypes.number,
    ]),
    header: React.PropTypes.node,
    blur: React.PropTypes.string,
    contentInset: React.PropTypes.object
}

ParallaxView.defaultProps = {
    windowHeight: 300,
    contentInset: { top: screen.scale }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: 'transparent',
    },
    scrollView: {
        backgroundColor: 'transparent',
    },
    background: {
        position: 'absolute',
        backgroundColor: '#2e2f31',
        width: screen.width,
        resizeMode: 'cover'
    },
    blur: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'transparent',
    },
    content: {
        shadowColor: '#222',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column'
    }
});
