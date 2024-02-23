import { GM_addElement } from '$';

import { download } from './logic/download';

const downloadButtonStyle = `
position: fixed;
bottom: 1rem;
left: 1rem;
z-index: 9999;
background-color: #005a9c;
color: #fff;
padding: 1rem 1.5rem;
cursor: pointer;
`;

const downloadButton = GM_addElement(
	document.getElementsByTagName('body')[0],
	'button',
	{
		id: 'audit-monkey',
		textContent: 'Download iCal',
		style: downloadButtonStyle
			.replace(/\n/g, ' ')
			.slice(1, -1) as unknown as CSSStyleDeclaration,
	},
);
downloadButton.addEventListener('click', download);
