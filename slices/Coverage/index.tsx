import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { RichText } from "@/components/RichText";

/**
 * Props for `Coverage`.
 */
export type CoverageProps = SliceComponentProps<Content.CoverageSlice>;

/**
 * Component for "Coverage" Slices.
 */
const Coverage: FC<CoverageProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<p>{slice.primary.eyebrow}</p>
			<RichText field={slice.primary.title} />
			<RichText field={slice.primary.text} />
			<PrismicNextImage field={slice.primary.image} />
			{slice.primary.cta.map((link, index) => (
				<PrismicNextLink key={index} field={link} />
			))}
		</section>
	);
};

export default Coverage;
