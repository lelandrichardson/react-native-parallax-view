import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, Animated } from 'react-native';
import { AnimatedKeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ScrollableMixin from 'react-native-scrollable-mixin';

const screen = Dimensions.get('window');
const ScrollViewPropTypes = ScrollView.propTypes;

/**
 * <ParallaxView />
 *
 * @property {Number} windowHeight
 * @property {Node|String|{ uri: String}} background
 * @property {Node} [header]
 * @property {Object} contentInset
 *
 */
class ParallaxView extends Component
{
    static propTypes = {
        ...ScrollViewPropTypes,
        windowHeight: React.PropTypes.number,
        background: React.PropTypes.object,
        header: React.PropTypes.node.optional,
        contentInset: React.PropTypes.object,
        scrollableViewStyle: React.PropTypes.object
    };

    constructor() {
        const defaultProps = {
            windowHeight: 300,
            contentInset: { top: screen.scale }
        };

        super(defaultProps);

        // Initial props
        this.props = defaultProps;

        // Initial state
        this.state = {
            scrollY: new Animated.Value(0)
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    /**
     * getScrollResponder method for ScrollableMixin
     * @returns {ScrollView}
     */
    getScrollResponder() {
        return this._scrollView.getScrollResponder();
    }

    /**
     * setNativeProps method for ScrollableMixin
     * @param {Object} props
     */
    setNativeProps(props) {
        this._scrollView.setNativeProps(props);
    }

    /**
     * On each scroll, set the content offset
     */
    handleScroll(eventData) {
        const events = [
            {
                nativeEvent: {
                    contentOffset: {
                        y: this.state.scrollY
                    }
                }
            }
        ];
        const config = {};

        if (typeof this.props.onScroll === 'function') {
            config.listener = eventData => this.props.onScroll(eventData)
        }

        return Animated.event(events, config);
    }

    /**
     * Render the Parallax view
     * @returns {XML}
     */
    render() {
        const { style, header, windowHeight, scrollableViewStyle } = this.props;

        const noHeaderStyle = {
            paddingTop: windowHeight
        };

        return (
            <View
                style={[styles.container, style]}
            >
                {this.renderBackground()}

                <AnimatedKeyboardAwareScrollView
                    {...this.props}
                    ref={component => this._scrollView = component}
                    style={[ styles.scrollView, header ? {} : noHeaderStyle ]}
                    onScroll={this.handleScroll()}
                    scrollEventThrottle={16}
                >
                    {this.renderHeader()}

                    <View
                        style={[ styles.content, scrollableViewStyle ]}
                    >
                        {this.props.children}
                    </View>
                </AnimatedKeyboardAwareScrollView>
            </View>
        );
    }

    /**
     * Renders the background component / background image
     * @returns {Node}
     */
    renderBackground() {
        const { windowHeight, background } = this.props;
        const { scrollY } = this.state;

        if (!windowHeight || !background) {
            return null;
        }

        const style = {
            height: windowHeight,
            transform: [
                {
                    translateY: scrollY.interpolate({
                        inputRange: [ -windowHeight, 0, windowHeight],
                        outputRange: [ windowHeight / 2, 0, -windowHeight / 3 ]
                    })
                },
                {
                    scale: scrollY.interpolate({
                        inputRange: [ -windowHeight, 0, windowHeight ],
                        outputRange: [ 2, 1, 1 ]
                    })
                }
            ]
        };

        if (typeof background === 'string') {
            return (
                <Animated.Image
                    style={[ styles.background, style ]}
                    source={{ uri: background }}
                    resizeMode="cover"
                />
            );
        }

        if (
            typeof background === 'object' &&
            background !== null &&
            typeof background.uri === 'string'
        ) {
            return (
                <Animated.Image
                    style={[ styles.background, style ]}
                    source={background}
                    resizeMode="cover"
                />
            );
        }

        return (
            <Animated.View
                style={[ styles.background, style ]}
            >
                {React.cloneElement(background, { style })}
            </Animated.View>
        )
    }

    /**
     * Render the header (on top of the background)
     * @returns {Node}
     */
    renderHeader() {
        const { windowHeight, background, header } = this.props;
        const { scrollY } = this.state;

        if (!windowHeight || !background || !header) {
            return null;
        }

        const style = {
            position: 'relative',
            height: windowHeight,
            opacity: scrollY.interpolate({
                inputRange: [ -windowHeight, 0, windowHeight / 1.2 ],
                outputRange: [1, 1, 0]
            }),
        };

        return (
            <Animated.View
                style={style}
            >
                {header}
            </Animated.View>
        );
    }
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
        width: screen.width
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

Object.assign(ParallaxView.prototype, ScrollableMixin);

export default ParallaxView;
