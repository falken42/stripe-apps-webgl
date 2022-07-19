import { Box, ContextView, Img } from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import * as THREE from 'three';

import BrandIcon from './brand_icon.svg';

// red square for initial testing
const pngData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASAAAAEgCAYAAAAUg66AAAAACXBIWXMAAAsTAAALEwEAmpwYAAADoklEQVR4nO3UMQEAIAzAMOCff7kgoweJgl7dd+YugMCpA4B/GRCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyDx/fBFiCR5C3AAAAAElFTkSuQmCC';

const App = ({ userContext, environment }: ExtensionContextValue) => {
	const scene = new THREE.Scene();
	console.log(scene);

	// outer div=320 width, 16 padding [320 - (16 * 2) = 288]
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
