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

let clicked = false;
let spinX = 0.0, spinY = 0.0;
let lastPos = null;

function createScene(scene) {
	scene.add(cube);
}

function updateScene(scene, time) {
	// auto animate if not yet controlled using the mouse
	if (!clicked) {
		cube.rotation.x = time / 2000.0;
		cube.rotation.y = time / 1000.0;
	} else {
		cube.rotation.y += spinX;
		cube.rotation.x += spinY;
	}
}

function mouseEvent(state) {
	// calculate relative movement from last mouse position
	const last = lastPos ?? state.pos;
	const rel = { x: state.pos.x - last.x, y: state.pos.y - last.y };
	lastPos = state.pos;

	if (state.buttons & 1) {
		spinX = rel.x * 1.5;
		spinY = rel.y * 1.5;
		clicked = true;
	}
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
