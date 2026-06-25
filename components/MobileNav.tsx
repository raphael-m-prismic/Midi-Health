"use client";

import { FC, useEffect, useState } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import { AccountIcon } from "@/components/AccountIcon";
import type { HeaderData } from "@/components/Header";

type MobileNavProps = {
	className?: string;
	logo: HeaderData["logo"];
	navLinks: HeaderData["nav_links"];
	cta: HeaderData["cta"];
};

/**
 * Interactive mobile navigation (< 1330px). Renders the header-row actions
 * (cta pill, account button, burger) and a full-screen overlay panel with the
 * stacked nav links. Receives already-fetched data as props — it never fetches.
 */
export const MobileNav: FC<MobileNavProps> = ({
	className,
	logo,
	navLinks = [],
	cta = [],
}) => {
	const [open, setOpen] = useState(false);

	// Lock body scroll while the overlay is open.
	useEffect(() => {
		if (!open) return;

		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", onKeyDown);

		return () => {
			document.body.style.overflow = previous;
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);

	const close = () => setOpen(false);

	return (
		<div className={clsx("flex items-center gap-3", className)}>
			{/* CTA pill */}
			{/* {cta.map((link, index) => (
				<PrismicNextLink
					key={index}
					field={link}
					className="inline-block rounded-xl bg-[#283e7e] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-800"
				/>
			))} */}

			{/* Account button */}
			<button
				type="button"
				aria-label="Account"
				className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-900 transition-colors hover:bg-neutral-100"
			>
				<AccountIcon className="h-5 w-5" />
			</button>

			{/* Burger button */}
			<button
				type="button"
				aria-label="Open menu"
				aria-expanded={open}
				onClick={() => setOpen(true)}
				className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-900 transition-colors hover:bg-neutral-100"
			>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={1.5}
					strokeLinecap="round"
					aria-hidden="true"
					className="h-5 w-5"
				>
					<line x1="4" y1="8" x2="20" y2="8" />
					<line x1="4" y1="12" x2="20" y2="12" />
					<line x1="4" y1="16" x2="20" y2="16" />
				</svg>
			</button>

			{/* Full-screen overlay */}
			<div
				aria-hidden={!open}
				className={clsx(
					"fixed inset-0 z-50 flex flex-col bg-neutral-50 transition-all duration-300 ease-out motion-reduce:transition-none",
					open
						? "translate-y-0 opacity-100"
						: "pointer-events-none -translate-y-2 opacity-0",
				)}
			>
				{/* Overlay top row */}
				<div className="flex items-center justify-between gap-4 px-6 py-4">
					<PrismicNextLink href="/" className="shrink-0" onClick={close}>
						<PrismicNextImage field={logo} className="h-10 w-auto" />
					</PrismicNextLink>

					<div className="flex items-center gap-3">
						{cta.map((link, index) => (
							<PrismicNextLink
								key={index}
								field={link}
								onClick={close}
								className="inline-block rounded-xl bg-[#283e7e] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-800"
							/>
						))}
						<button
							type="button"
							aria-label="Account"
							className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-900 transition-colors hover:bg-neutral-100"
						>
							<AccountIcon className="h-5 w-5" />
						</button>
						<button
							type="button"
							aria-label="Close menu"
							onClick={close}
							className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-900 transition-colors hover:bg-neutral-100"
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={1.5}
								strokeLinecap="round"
								aria-hidden="true"
								className="h-5 w-5"
							>
								<line x1="6" y1="6" x2="18" y2="18" />
								<line x1="18" y1="6" x2="6" y2="18" />
							</svg>
						</button>
					</div>
				</div>

				{/* Stacked nav links */}
				{navLinks.length > 0 && (
					<nav className="flex-1 overflow-y-auto px-6 py-8">
						<ul className="flex flex-col">
							{navLinks.map((link, index) => (
								<li key={index} className="border-b border-neutral-200">
									<PrismicNextLink
										field={link}
										onClick={close}
										className="block py-5 text-2xl text-neutral-900 transition-colors hover:text-neutral-500"
									/>
								</li>
							))}
						</ul>
					</nav>
				)}

				{/* Bottom CTA */}
				{cta.length > 0 && (
					<div className="mt-auto flex flex-col gap-3 px-6 pb-10">
						{cta.map((link, index) => (
							<PrismicNextLink
								key={index}
								field={link}
								onClick={close}
								className="block rounded-xl bg-[#283e7e] px-6 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-indigo-800"
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default MobileNav;
