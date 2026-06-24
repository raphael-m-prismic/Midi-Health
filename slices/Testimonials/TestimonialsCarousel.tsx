"use client";

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import clsx from "clsx";
import { RichText } from "@/components/RichText";

type TestimonialsCarouselProps = {
	items: Content.TestimonialsSliceDefaultPrimaryItemsItem[];
};

// Bottom-band colors, cycled by card index.
const BAND_PALETTE = ["#662311", "#ff7044", "#ff8dbb", "#9eb8d8"];

/**
 * Interactive horizontal carousel of quote cards. Receives the already fetched
 * `items` group as props — it does not fetch. Prev/next arrows scroll the snap
 * container by roughly one card width.
 */
export const TestimonialsCarousel: FC<TestimonialsCarouselProps> = ({
	items,
}) => {
	const scrollRef = useRef<HTMLUListElement>(null);

	// Early return: nothing to show.
	if (items.length === 0) return null;

	const scrollByCard = (direction: 1 | -1) => {
		const container = scrollRef.current;
		if (!container) return;
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
				aria-label="Testimonials"
				className={clsx(
					"flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4",
					"[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
					"scroll-smooth motion-reduce:scroll-auto",
				)}
			>
				{items.map((item, index) => (
					<li
						key={index}
						className="w-[250px] shrink-0 snap-start"
					>
						<figure className="relative flex h-full min-h-[360px] flex-col rounded-none border border-neutral-900/20 p-8 pb-6">
							{/* Decorative opening quote mark */}
							<span
								aria-hidden="true"
								className="font-[family-name:var(--font-source-serif)] text-5xl leading-none text-neutral-900"
							>
								&ldquo;
							</span>

							{/* Quote */}
							{item.quote && (
								<blockquote className="font-[family-name:var(--font-source-serif)] text-lg text-neutral-800">
									<RichText field={item.quote} />
								</blockquote>
							)}

							{/* Author */}
							{item.author && (
								<figcaption className="mt-auto pt-6 text-sm font-semibold uppercase tracking-wide text-neutral-900">
									&mdash; {item.author}
								</figcaption>
							)}

							{/* Color band — square, flush at the bottom inside the border */}
							<span
								aria-hidden="true"
								className="absolute inset-x-0 bottom-0 h-2.5"
								style={{
									backgroundColor: BAND_PALETTE[index % BAND_PALETTE.length],
								}}
							/>
						</figure>
					</li>
				))}
			</ul>

			{/* Prev / next arrows */}
			<div className="mt-6 flex justify-end gap-3">
				<button
					type="button"
					aria-label="Previous testimonials"
					onClick={() => scrollByCard(-1)}
					className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-900 text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
				>
					<ArrowIcon className="h-5 w-5 rotate-180" />
				</button>
				<button
					type="button"
					aria-label="Next testimonials"
					onClick={() => scrollByCard(1)}
					className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-900 text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
				>
					<ArrowIcon className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
};

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

export default TestimonialsCarousel;
