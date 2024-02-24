import { GM_addElement } from '$';

import { download } from './logic/download';

const downloadButton = GM_addElement(
	document.getElementsByTagName('body')[0],
	'button',
	{
		id: 'audit-monkey',
		textContent: 'Download iCal',
		style:
			'position: fixed; bottom: 1rem; left: 1rem; z-index: 9999; background-color: #005a9c; color: #fff; padding: 1rem 1.5rem; cursor: pointer;' as unknown as CSSStyleDeclaration,
	},
);
downloadButton.addEventListener('click', download);
