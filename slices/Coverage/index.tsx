import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import { RichText } from "@/components/RichText";

/**
 * Props for `Coverage`.
 */
export type CoverageProps = SliceComponentProps<Content.CoverageSlice>;

/**
 * Component for "Coverage" Slices.
 */
const Coverage: FC<CoverageProps> = ({ slice }) => {
	const imageLeft = slice.variation === "imageLeft";

	const text = (
		<div
			className={clsx(
				"flex flex-col justify-center px-6 py-16 md:px-12 lg:px-16 md:py-24",
				// On mobile text is always first; on desktop move it after the
				// image for the imageLeft variation.
				imageLeft && "md:order-2",
			)}
		>
			{slice.primary.eyebrow && (
				<p className="mb-5 text-sm font-semibold uppercase tracking-widest text-neutral-900">
					{slice.primary.eyebrow}
				</p>
			)}
			<RichText field={slice.primary.title} />
			<RichText field={slice.primary.text} />
			{slice.primary.cta.length > 0 && (
				<ul className="mt-6 flex flex-wrap gap-4">
					{slice.primary.cta.map((link, index) => (
						<li key={index}>
							<PrismicNextLink
								field={link}
								className="inline-block rounded-xl bg-indigo-700 px-8 py-4 font-semibold text-white"
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	);

	const image = slice.primary.image.url ? (
		<div className="flex items-center justify-center px-6 py-16 md:px-12 lg:px-16 md:py-24">
			<PrismicNextImage
				field={slice.primary.image}
				className="h-auto w-full object-contain"
			/>
		</div>
	) : null;

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<div className="mx-auto grid w-full max-w-[1440px] md:grid-cols-2">
				{text}
				{image}
			</div>
		</section>
	);
};

export default Coverage;
