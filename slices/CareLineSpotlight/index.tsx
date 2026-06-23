import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import { RichText } from "@/components/RichText";

/**
 * Props for `CareLineSpotlight`.
 */
export type CareLineSpotlightProps =
	SliceComponentProps<Content.CareLineSpotlightSlice>;

/**
 * Component for "CareLineSpotlight" Slices.
 */
const CareLineSpotlight: FC<CareLineSpotlightProps> = ({ slice }) => {
	const hasImage = isFilled.image(slice.primary.image);
	const ctas = slice.primary.cta ?? [];

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className={clsx(
				"relative flex min-h-[420px] w-full items-center justify-center overflow-hidden text-center md:min-h-[560px]",
				// Fall back to a solid neutral background when no image is set
				// so the light text stays readable.
				!hasImage && "bg-neutral-800",
			)}
		>
			{/* Full-bleed background layer */}
			{hasImage && (
				<>
					<PrismicNextImage
						field={slice.primary.image}
						fill
						className="absolute inset-0 z-0 object-cover"
					/>
					{/* Scrim for legibility */}
					<div className="absolute inset-0 z-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
				</>
			)}

			{/* Content layer (constrained + centered) */}
			<div className="relative z-10 mx-auto max-w-2xl px-6">
				{isFilled.richText(slice.primary.title) && (
					<RichText
						field={slice.primary.title}
						additionalClassNames="text-white"
					/>
				)}
				{isFilled.richText(slice.primary.text) && (
					<RichText
						field={slice.primary.text}
						additionalClassNames="text-white"
					/>
				)}
				{ctas.length > 0 && (
					<ul className="mt-8 flex flex-wrap justify-center gap-4">
						{ctas.map((link, index) => (
							<li key={index}>
								<PrismicNextLink
									field={link}
									className="inline-block rounded-full bg-neutral-50 px-8 py-4 font-semibold text-neutral-900 transition hover:-translate-y-0.5 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
								/>
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	);
};

export default CareLineSpotlight;
