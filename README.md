# react-native-parallax-view
Parallax view for vertical scrollview/listviews with a header image and header content

## Installation

```bash
$ npm i react-native-parallax-view --save
```

## Demo

![parallax view demo](http://media.giphy.com/media/3o85xxIYicm26IyaTm/giphy.gif)

[Appetize.io demo](https://appetize.io/embed/dhw0pbp14v89w60quwrj6w70dg?device=iphone5s&scale=100&autoplay=false&orientation=portrait&deviceColor=black&params=%7B%22appId%22:%22qAFzcA%22,%22moduleName%22:%22ParallaxExample%22%7D)

## Example

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
| blur | NO | `null` | `string` | one of "light", "dark", or "xlight", or `null`. If specified, the image view will have a UIBlurView put on top of it. |
| ... | NO | | `...ScrollViewProps` | `{...this.props}` is applied on the internal `ScrollView` (excluding the `style` prop which is passed on to the outer container) |
