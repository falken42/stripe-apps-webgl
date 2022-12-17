import React, { useState, useEffect, useRef } from 'react';
import { Img } from '@stripe/ui-extension-sdk/ui';
import * as THREE from 'three';

const ThreeJS = (props) => {
	const [bounds, setBounds] = useState(null);
	const [renderOutput, setRenderOutput] = useState('');

	// get width/height of view (288px is the maximum width that will (currently) fit within a Stripe App)
	// -> outer div=320 width, 16 padding [320 - (16 * 2) = 288]
	const width  = props.width  ?? 288;
	const height = props.height ?? 288;

	useEffect(() => {
		// create initial sliding bounds window (this is complicated due to the fact we're in a sandboxed iframe with no access to the DOM)
		// (note: the upper Y=275 coordinate here works correctly out of the box only if this ThreeJS component is the first in the ContextView)
		const upperLeft = { x: 9999, y: 275 };
		const bound = { x1: upperLeft.x, y1: upperLeft.y, x2: upperLeft.x + width, y2: upperLeft.y + height };
		setBounds(bound);

		// create renderer
		const renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setSize(width, height);

		// create camera
		const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
		camera.position.z = 1;

		// create scene
		const scene = new THREE.Scene();
		if (typeof props.onSceneInit === 'function')
			props.onSceneInit(scene);

		// hook animation loop to redraw frame
		renderer.setAnimationLoop((time) => {
			if (typeof props.onSceneUpdate === 'function')
				props.onSceneUpdate(scene, time);

			renderer.render(scene, camera);
			setRenderOutput(renderer.domElement.toDataURL());
		} );
	}, []);

	return (
		<Img width={width} height={height} src={renderOutput} onMouseMove={(evt) => {
			const mx = evt.clientX;
			const my = evt.clientY;

			// update sliding bounds window based on input coordinates
			let bound = bounds;
			if ((mx < bound.x1) || (my < bound.y1)) {
				bound.x1 = Math.min(mx, bound.x1);
				bound.y1 = Math.min(my, bound.y1);
				bound.x2 = bound.x1 + width;
				bound.y2 = bound.y1 + height;
			} else if ((mx > bound.x2) || (my > bound.y2)) {
				bound.x2 = Math.max(mx, bound.x2);
				bound.y2 = Math.max(my, bound.y2);
				bound.x1 = bound.x2 - width;
				bound.y1 = bound.y2 - height;
			}

			setBounds(bound);

			// call event hook
			if (typeof props.onMouseEvent === 'function') {
				// convert mouse coords to local normalized space
				const pos = {
					x: (mx - bounds.x1) / width,
					y: (my - bounds.y1) / height
				};

				props.onMouseEvent(pos);
			}
		} } />
	);
}

export default ThreeJS;
