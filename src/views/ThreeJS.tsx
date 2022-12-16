import React, { useState, useEffect } from 'react';
import { Img } from '@stripe/ui-extension-sdk/ui';
import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);

const ThreeJS = (props) => {
	const [renderOutput, setRenderOutput] = useState('');

	// get width/height of view (288px is the maximum width that will (currently) fit within a Stripe App)
	// -> outer div=320 width, 16 padding [320 - (16 * 2) = 288]
	const width  = props.width  ?? 288;
	const height = props.height ?? 288;

	useEffect(() => {
		// create renderer
		const renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setSize(width, height);

		// create camera
		const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
		camera.position.z = 1;

		// create scene
		const scene = new THREE.Scene();
		scene.add(mesh);

		// hook animation loop to redraw frame
		renderer.setAnimationLoop((time) => {
			mesh.rotation.x = time / 2000.0;
			mesh.rotation.y = time / 1000.0;
			renderer.render(scene, camera);
			setRenderOutput(renderer.domElement.toDataURL());
		} );
	}, []);

	return (
		<Img width={width} height={height} src={renderOutput} />
	);
}

export default ThreeJS;
