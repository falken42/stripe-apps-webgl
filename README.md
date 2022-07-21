# stripe-apps-webgl

Implementing WebGL within a Stripe App (using [Three.js](https://github.com/mrdoob/three.js/))

## Demo

![Demo](stripe-webgl-demo.gif)

## Prerequisites

For Homebrew on macOS,

1. Install Stripe CLI: `brew install stripe/stripe-cli/stripe`
2. Install Stripe Apps CLI plugin: `stripe plugin install apps`

For more info, see: https://stripe.com/docs/stripe-apps/create-app

## Building

1. Clone this repo
2. Run `yarn install`
3. Run `stripe apps start`

## How It Works

As Stripe Apps run in an sandboxed `iframe` and do not have direct access to the parent DOM, and there (currently) is no [UI Component](https://stripe.com/docs/stripe-apps/components) which can be used to create or obtain access to a HTML Canvas, it is not possible to *directly* render GPU output into a Stripe App.

(There is [discussion](https://github.com/stripe/stripe-apps/issues/192#issuecomment-1126359398) that a `WebView` component might be added in the future, possibly post-launch.)

Stripe Apps do however support display of images, specifically images that can be shown via [data URLs](https://stripe.com/docs/stripe-apps/components/img#data-urls), which can be generated and encoded at runtime.  Using this method, we can render the WebGL output into a buffer, copy out the final rendered frame, encode the frame into an image, and display it within the app's view.

## Animation

Updating the app's view to show a new frame is fairly easy.  We store the output frame (encoded into a data URL) as a React state, which is referenced by the `src` attribute in the `<Img>` tag.  We then hook the renderer's `setAnimationLoop()` call via an Effect Hook when the component is created, and update the image data by changing the state, which then displays the new frame.

```
const ThreeJS = () => {
	const [renderOutput, setRenderOutput] = useState('');

	useEffect(() => {
		renderer.setAnimationLoop((time) => {
			// ...update scene here...
			renderer.render(scene, camera);
			setRenderOutput(renderer.domElement.toDataURL());
		});
	}, []);

	return (
		<Img width={width} height={height} src={renderOutput} />
	);
}
```

## Input

TODO
