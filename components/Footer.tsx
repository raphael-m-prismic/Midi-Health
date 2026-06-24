import { FC, ReactNode, SVGProps } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import { createClient } from "@/prismicio";
import { NewsletterForm } from "@/components/NewsletterForm";

const BAND_FALLBACK = "#E7E0D8";
const FOOTER_BG = "#662311";

/**
 * Inline social icons keyed by the `platform` text value. lucide-react is not
 * installed, so these are hand-rolled SVGs (server-safe).
 */
const SOCIAL_ICONS: Record<string, (props: SVGProps<SVGSVGElement>) => ReactNode> = {
	facebook: (props) => (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
			<path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
		</svg>
	),
	instagram: (props) => (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
			<rect x="2" y="2" width="20" height="20" rx="5" />
			<circle cx="12" cy="12" r="4" />
			<circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
		</svg>
	),
	linkedin: (props) => (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
			<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
		</svg>
	),
	youtube: (props) => (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
			<path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.57V8.43L15.82 12 9.6 15.57Z" />
		</svg>
	),
	tiktok: (props) => (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
			<path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.3v12.96a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .7-5.08V9.97a5.92 5.92 0 0 0-.7-.04 5.9 5.9 0 1 0 5.9 5.9V9.3a7.55 7.55 0 0 0 4.4 1.41V7.4a4.28 4.28 0 0 1-3.36-1.58Z" />
		</svg>
	),
};

/**
 * Site footer rendered from the `footer` singleton custom type. Async server
 * component: fetches the document and passes the newsletter labels down to the
 * interactive `NewsletterForm` client subcomponent. Every group/repeatable is
 * guarded so a missing or partially filled document never crashes.
 */
export const Footer: FC = async () => {
	const client = createClient();
	const footer = await client.getSingle("footer").catch(() => null);

	// The `footer` singleton may not be published yet.
	if (!footer) return null;

	const { data } = footer;
	const badges = data.badges ?? [];
	const column1 = data.column_1_links ?? [];
	const column2 = data.column_2_links ?? [];
	const column3 = data.column_3_links ?? [];
	const socialLinks = data.social_links ?? [];
	const legalLinks = data.legal_links ?? [];

	const linkClass =
		"text-lg text-white transition-colors hover:text-white";

	return (
		<footer>
			{/* Part 1 — logo band */}
			{data.logo.url && (
				<div
					className="w-full"
					style={{ backgroundColor: data.logo_band_color || BAND_FALLBACK }}
				>
					<div className="mx-auto w-full max-w-[1440px] px-6 py-12 md:px-12 md:py-20 lg:px-16">
						<PrismicNextImage
							field={data.logo}
							className="mx-auto h-auto w-full object-contain"
						/>
					</div>
				</div>
			)}

			{/* Part 2 — main footer */}
			<div className="w-full text-white" style={{ backgroundColor: FOOTER_BG }}>
				<div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12 lg:px-16">
					<div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
						{/* Newsletter (left-anchored) */}
						<div className="w-full">
							{data.newsletter_title && (
								<h2 className="mb-4 text-lg font-semibold">
									{data.newsletter_title}
								</h2>
							)}
							<NewsletterForm
								placeholder={data.newsletter_placeholder}
								ctaLabel={data.newsletter_cta_label}
							/>
							{badges.length > 0 && (
								<ul className="mt-10 flex flex-wrap items-center gap-4">
									{badges.map((badge, index) => {
										const image = (
											<PrismicNextImage
												field={badge.image}
												className="h-20 w-auto object-contain"
											/>
										);
										return (
											<li key={index}>
												{badge.link?.link_type &&
													badge.link.link_type !== "Any" ? (
													<PrismicNextLink field={badge.link}>
														{image}
													</PrismicNextLink>
												) : (
													image
												)}
											</li>
										);
									})}
								</ul>
							)}
						</div>

						{/* Link + social columns (right-anchored group, equal-width tracks) */}
						<div className="w-full grid grid-cols-1 gap-20 md:ml-auto md:grid-flow-col md:auto-cols-fr md:grid-cols-none">
							{/* Column 1 */}
							{column1.length > 0 && (
								<nav>
									<ul className="flex flex-col gap-3">
										{column1.map((link, index) => (
											<li key={index}>
												<PrismicNextLink field={link} className={linkClass} />
											</li>
										))}
									</ul>
								</nav>
							)}

							{/* Column 2 */}
							{column2.length > 0 && (
								<nav>
									<ul className="flex flex-col gap-3">
										{column2.map((link, index) => (
											<li key={index}>
												<PrismicNextLink field={link} className={linkClass} />
											</li>
										))}
									</ul>
								</nav>
							)}

							{/* Column 3 */}
							{column3.length > 0 && (
								<nav>
									<ul className="flex flex-col gap-3">
										{column3.map((link, index) => (
											<li key={index}>
												<PrismicNextLink field={link} className={linkClass} />
											</li>
										))}
									</ul>
								</nav>
							)}

							{/* Social */}
							{socialLinks.length > 0 && (
								<div className="max-w-">
									<h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
										Connect with Midi
									</h3>
									<ul className="flex flex-wrap gap-3">
										{socialLinks.map((social, index) => {
											const platform = (social.platform || "").toLowerCase();
											const Icon = SOCIAL_ICONS[platform];
											return (
												<li key={index}>
													<PrismicNextLink
														field={social.link}
														aria-label={social.platform || "Social link"}
														className="flex h-10 w-10 items-center justify-cente text-white"
													>
														{Icon ? (
															<Icon className="h-8 w-8" />
														) : (
															<span className="text-xs font-medium">
																{(social.platform || "?").slice(0, 2)}
															</span>
														)}
													</PrismicNextLink>
												</li>
											);
										})}
									</ul>
								</div>
							)}
						</div>
					</div>

					{/* Bottom bar */}
					{(legalLinks.length > 0 || data.copyright) && (
						<div
							className={clsx(
								"mt-20 flex flex-col gap-4 border-t border-white pt-6",
								"md:flex-row md:items-center md:justify-between",
							)}
						>
							{legalLinks.length > 0 && (
								<ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
									{legalLinks.map((link, index) => (
										<li key={index}>
											<PrismicNextLink
												field={link}
												className="text-md text-white transition-colors hover:text-white"
											/>
										</li>
									))}
								</ul>
							)}
							{data.copyright && (
								<p className="text-md text-white">{data.copyright}</p>
							)}
						</div>
					)}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
