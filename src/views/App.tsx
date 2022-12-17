import { ContextView } from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import ThreeJS from './ThreeJS';
import * as THREE from 'three';

import BrandIcon from './brand_icon.svg';

const width  = 288;
const height = 288;

const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);

function createScene(scene) {
	scene.add(cube);
}

function updateScene(scene, time) {
	cube.rotation.x = time / 2000.0;
	cube.rotation.y = time / 1000.0;
}

function mouseEvent(state) {
	console.log('pos: (' + state.pos.x + ', ' + state.pos.y + '), buttons: ' + state.buttons);
}

const App = ({ userContext, environment }: ExtensionContextValue) => {
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

			<ThreeJS width={width} height={height} onSceneInit={createScene} onSceneUpdate={updateScene} onMouseEvent={mouseEvent} />
		</ContextView>
	);
}

export default App;
