import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { RichText } from "@/components/RichText";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

/**
 * Component for "Testimonials" Slices. Server component: renders the header row
 * and hands the items off to the interactive `TestimonialsCarousel`.
 */
const Testimonials: FC<TestimonialsProps> = ({ slice }) => {
	const cta = slice.primary.cta ?? [];

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="w-full"
		>
			<div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12 lg:px-16 md:py-24">
				{/* Header row */}
				<div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
					{/* Left: eyebrow + title */}
					<div className="flex flex-col">
						{slice.primary.eyebrow && (
							<p className="mb-5 text-sm font-semibold uppercase tracking-widest text-neutral-900">
								{slice.primary.eyebrow}
							</p>
						)}
						<RichText field={slice.primary.title} />
					</div>

					{/* Right: cta */}
					{cta.length > 0 && (
						<ul className="flex flex-wrap gap-4 md:shrink-0">
							{cta.map((link, index) => (
								<li key={index}>
									<PrismicNextLink
										field={link}
										className="inline-block rounded-full border border-neutral-900 px-6 py-3 font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
									/>
								</li>
							))}
						</ul>
					)}
				</div>

				{/* Carousel */}
				<TestimonialsCarousel items={slice.primary.items ?? []} />
			</div>
		</section>
	);
};

export default Testimonials;
