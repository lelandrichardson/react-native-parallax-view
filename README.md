# react-native-parallax-view

Parallax view for vertical scrollview with a header image and header content

## Installation

```bash
$ npm i react-native-parallax-view --save
```

## Demo

![parallax view demo](http://i.giphy.com/xTiTneeCb1npaGorhm.gif)

NOTE: I will put up an rnplay.org working example whenever they support React Native 0.8.0

## Example

There is a working example in the project `/example` folder that you can check out. Remember to run npm install inside 
the example folder if you'd like to run that project.

```bash
cd react-native-parallax-view
cd example
npm install
```

Additionally, here is an example of the usage

```jsx
<ParallaxView
    backgroundSource={require('image!backgroundImage')}
    windowHeight={300}
    header={(
        <Text style={styles.header}>
            Header Content
        </Text>
    )}
>
  <View>
    // ... scrollview content
  </View>
</ParallaxView>
```


## API (props)

| Prop | Required | Default  | Type | Description |
| :------------ |:---:|:---------------:| :---------------:| :-----|
| backgroundSource | YES | `null` | `object` | the `source` prop that get's passed to the background `<Image>` component. If left blank, no background is rendered |
| header | NO | `null` | `renderable` | any content you want to render on top of the image. This content's opacity get's animated down as the scrollview scrolls up. (optional) |
| windowHeight | NO | `300` | `number` | the resting height of the header image. If 0 is passed in, the background is not rendered. |
| ... | NO | | `...ScrollViewProps` | `{...this.props}` is applied on the internal `ScrollView` (excluding the `style` prop which is passed on to the outer container) |
