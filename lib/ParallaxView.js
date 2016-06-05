'use strict';

import React, { Component } from 'react';

import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  Animated,
} from 'react-native';

var ScrollableMixin = require('react-native-scrollable-mixin');
var screen = Dimensions.get('window');
var ScrollViewPropTypes = ScrollView.propTypes;

var ParallaxView = React.createClass({
  mixins: [ScrollableMixin],

  propTypes: {
    ...ScrollViewPropTypes,
    windowHeight: React.PropTypes.number,
    backgroundSource: React.PropTypes.string,
    header: React.PropTypes.node,
    blur: React.PropTypes.string,
    contentInset: React.PropTypes.object,
  },

  getDefaultProps: function () {
    return {
      windowHeight: 300,
      contentInset: {
        top: screen.scale
      }
    };
  },

  getInitialState: function () {
    return {
      scrollY: new Animated.Value(0)
    };
  },

  /**
  * IMPORTANT: You must return the scroll responder of the underlying
  * scrollable component from getScrollResponder() when using ScrollableMixin.
  */
  getScrollResponder() {
    return this._scrollView.getScrollResponder();
  },

  setNativeProps(props) {
    this._scrollView.setNativeProps(props);
  },

  renderBackground: function () {
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
              inputRange: [ -windowHeight, 0, windowHeight],
              outputRange: [windowHeight/2, 0, -windowHeight/3]
            })
          },{
            scale: scrollY.interpolate({
              inputRange: [ -windowHeight, 0, windowHeight],
              outputRange: [2, 1, 1]
            })
          }]
        },
  /*      {opacity: scrollY.interpolate({
          inputRange: [ -windowHeight, 0, windowHeight],
          outputRange: [0, 1, 0]
        })}*/
        ]}
        source={{uri: backgroundSource}}
        >

        </Animated.Image>
      );
    },

    renderHeader: function () {
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
              inputRange: [-windowHeight, 0, windowHeight / 2],
              outputRange: [1, 1, 0]
            }),
          }}>
          {this.props.header}
        </Animated.View>
      );
    },

    render: function () {
      var { style, ...props } = this.props;
      return (
        <View style={[styles.container, style]}>
          {this.renderBackground()}
          <ScrollView
            ref={component => { this._scrollView = component; }}
            {...props}
            style={styles.scrollView}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY }}}]
            )}
            scrollEventThrottle={16}>
            {this.renderHeader()}
            <View style={[styles.content, props.scrollableViewStyle]}>
              {this.props.children}
            </View>
          </ScrollView>
        </View>
      );
    }
  });

  var styles = StyleSheet.create({
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

  module.exports = ParallaxView;
