import { Box, ContextView, Img } from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import * as THREE from 'three';

import BrandIcon from './brand_icon.svg';

const App = ({ userContext, environment }: ExtensionContextValue) => {
	// outer div=320 width, 16 padding [320 - (16 * 2) = 288]
	const width  = 288;
	const height = 288;

	const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
	camera.position.z = 1;

	const scene = new THREE.Scene();

	const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
	const material = new THREE.MeshNormalMaterial();

	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	mesh.rotation.x = 0.35;
	mesh.rotation.y = 0.65;

	const renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize(width, height);
	renderer.render(scene, camera);

	const pngData = renderer.domElement.toDataURL();

	return (
		<ContextView
			title='Hello WebGL!'
			brandColor='#F6F8FA' // replace this with your brand color
			brandIcon={BrandIcon} // replace this with your brand icon
			externalLink={{
				label: 'View on GitHub',
				href: 'https://github.com/falken42/stripe-apps-webgl'
			}}
			>

			<Img width='288' height='288' src={pngData} />
		</ContextView>
	);
};

export default App;
