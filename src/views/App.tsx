import { ContextView, Button } from '@stripe/ui-extension-sdk/ui';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';
import ThreeJS from './ThreeJS';

import BrandIcon from './brand_icon.svg';

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

			<ThreeJS />
		</ContextView>
	);
}

export default App;
