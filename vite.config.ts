import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

import { icon } from './icon.json';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		monkey({
			entry: 'src/main.ts',
			userscript: {
				icon64: icon,
				namespace: 'github/audit-monkey',
				match: ['https://myadelaide.uni.adelaide.edu.au/*'],
				grant: ['GM.addElement', 'unsafeWindow'],
				source: 'https://github.com/jsun969/audit-monkey',
			},
		}),
	],
});
