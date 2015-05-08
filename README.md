# react-native-parallax-view
Parallax view for vertical scrollview/listviews with a header image and header content

## Demo

![parallax view demo](http://media.giphy.com/media/3o85xxIYicm26IyaTm/giphy.gif)

## Example

    <ParallaxView
        backgroundSource={require('image!backgroundImage')}
        header={(
            <Text style={styles.header}>
                Header Content
            </Text>
        )}
        windowHeight={300}
    >
      <View>
        // ... content
      </View>
    </ParallaxView>



## API (props)

- `backgroundSource`: (object) => the `source` prop that get's passed to the background `<Image>` component.
- `header`: (renderable) => any content you want to render on top of the image. This content's opacity get's animated down as the scrollview scrolls up. (optional)
- `windowHeight`: (number) => the resting height of the header image.
- `blur` (string) => one of "light", "dark", or "xlight", or `null`. If specified, the image view will have a UIBlurView put on top of it.


