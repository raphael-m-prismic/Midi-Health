"use client";

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

type OtherTopicsCarouselProps = {
	items: Content.OtherTopicsSliceDefaultPrimaryItemsItem[];
};

/**
 * Interactive horizontal carousel of care-line cards. Receives the already
 * fetched `items` group as props — it does not fetch. Prev/next arrows scroll
 * the snap container by roughly one card width.
 */
export const OtherTopicsCarousel: FC<OtherTopicsCarouselProps> = ({ items }) => {
	const scrollRef = useRef<HTMLUListElement>(null);

	// Early return: nothing to show.
	if (items.length === 0) return null;

	const scrollByCard = (direction: 1 | -1) => {
		const container = scrollRef.current;
		if (!container) return;
		// Scroll by the width of the first card (plus gap) when available.
		const firstCard = container.querySelector("li");
		const amount = firstCard
			? firstCard.getBoundingClientRect().width + 24
			: container.clientWidth * 0.8;
		container.scrollBy({ left: direction * amount, behavior: "smooth" });
	};

	return (
		<div className="mt-12">
			<ul
				ref={scrollRef}
				aria-label="Other care topics"
				className={clsx(
					"flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4",
					"[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
					"scroll-smooth motion-reduce:scroll-auto",
				)}
			>
				{items.map((item, index) => {
					const hasLink =
						item.link?.link_type && item.link.link_type !== "Any";

					return (
						<li
							key={index}
							className="w-[280px] shrink-0 snap-start sm:w-[300px] lg:w-[320px]"
						>
							{/* Image with overlaid "+" */}
							<div className="relative">
								{item.image.url && (
									<PrismicNextImage
										field={item.image}
										className="aspect-[4/5] w-full rounded-2xl object-cover"
									/>
								)}
								{hasLink ? (
									<PrismicNextLink
										field={item.link}
										aria-label={item.item_title || "Learn more"}
										tabIndex={-1}
										className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 shadow-md transition-colors hover:bg-neutral-100"
									>
										<PlusIcon />
									</PrismicNextLink>
								) : (
									<span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 shadow-md">
										<PlusIcon />
									</span>
								)}
							</div>

							{/* Title */}
							{item.item_title && (
								<h3 className="mt-4 font-[family-name:var(--font-source-serif)] text-xl text-neutral-900">
									{item.item_title}
								</h3>
							)}

							{/* Link as ghost pill */}
							{hasLink && (
								<PrismicNextLink
									field={item.link}
									className="mt-3 inline-block rounded-full border border-neutral-900 px-6 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
								/>
							)}
						</li>
					);
				})}
			</ul>

			{/* Prev / next arrows */}
			<div className="mt-6 flex justify-end gap-3">
				<button
					type="button"
					aria-label="Previous topics"
					onClick={() => scrollByCard(-1)}
					className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-900 text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
				>
					<ArrowIcon className="h-5 w-5 rotate-180" />
				</button>
				<button
					type="button"
					aria-label="Next topics"
					onClick={() => scrollByCard(1)}
					className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-900 text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
				>
					<ArrowIcon className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
};

const PlusIcon: FC = () => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		aria-hidden="true"
		className="h-5 w-5"
	>
		<line x1="12" y1="5" x2="12" y2="19" />
		<line x1="5" y1="12" x2="19" y2="12" />
	</svg>
);

const ArrowIcon: FC<{ className?: string }> = ({ className }) => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={1.8}
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		className={className}
	>
		<line x1="5" y1="12" x2="19" y2="12" />
		<polyline points="12 5 19 12 12 19" />
	</svg>
);

export default OtherTopicsCarousel;
