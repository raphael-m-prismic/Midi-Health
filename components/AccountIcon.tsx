import { FC, SVGProps } from "react";

/**
 * Outlined "person" glyph used in the account button. Plain presentational SVG
 * so it can be shared by the server `Header` and the client `MobileNav`.
 */
export const AccountIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={1.5}
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		{...props}
	>
		<circle cx="12" cy="8" r="3.5" />
		<path d="M5 19a7 7 0 0 1 14 0" />
	</svg>
);

export default AccountIcon;
