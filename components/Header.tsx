import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { createClient } from "@/prismicio";
import { AccountIcon } from "@/components/AccountIcon";
import { MobileNav } from "@/components/MobileNav";

/**
 * Site header rendered from the `header` singleton custom type. Displays the
 * logo, navigation links, an account button, and call-to-action links.
 *
 * Async server component: it fetches the `header` document and passes the
 * resolved data down to the interactive `MobileNav` client subcomponent. The
 * desktop nav (>= 1330px) is rendered here; the burger menu (< 1330px) lives in
 * `MobileNav`.
 */
export const Header: FC = async () => {
	const client = createClient();
	const header = await client.getSingle("header").catch(() => null);

	// The `header` singleton may not be published yet.
	if (!header) return null;

	const navLinks = header.data.nav_links ?? [];
	const cta = header.data.cta ?? [];

	return (
		<header className="border-b border-neutral-200 bg-neutral-50">
			<div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-8 px-6 py-4 md:px-12 lg:px-16">
				{/* Logo */}
				<PrismicNextLink href="/" className="shrink-0">
					<PrismicNextImage field={header.data.logo} className="h-10 w-auto" />
				</PrismicNextLink>

				{/* Desktop nav (>= 1330px) */}
				{navLinks.length > 0 && (
					<nav className="hidden nav:block">
						<ul className="flex items-center gap-8">
							{navLinks.map((link, index) => (
								<li key={index}>
									<PrismicNextLink
										field={link}
										className="font-medium text-neutral-900 transition-colors hover:text-neutral-500"
									/>
								</li>
							))}
						</ul>
					</nav>
				)}

				{/* Desktop actions (>= 1330px) */}
				<div className="hidden items-center gap-4 nav:flex">
					{cta.length > 0 &&
						cta.map((link, index) => (
							<PrismicNextLink
								key={index}
								field={link}
								className="inline-block rounded-xl bg-indigo-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-800"
							/>
						))
					}
					<button
						type="button"
						aria-label="Account"
						className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-900 transition-colors hover:bg-neutral-100"
					>
						<AccountIcon className="h-5 w-5" />
					</button>
				</div>

				{/* Mobile nav (< 1330px) */}
				<MobileNav
					className="nav:hidden"
					logo={header.data.logo}
					navLinks={navLinks}
					cta={cta}
				/>
			</div>
		</header>
	);
};

export type HeaderData = Content.HeaderDocument["data"];

export default Header;
