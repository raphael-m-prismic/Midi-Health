import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { RichText } from "@/components/RichText";

/**
 * Props for `Feature`.
 */
export type FeatureProps = SliceComponentProps<Content.FeatureSlice>;

/**
 * Component for "Feature" Slices.
 */
const Feature: FC<FeatureProps> = ({ slice }) => {
	// `color` is a styling concern and is intentionally left unused for now.
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<p>{slice.primary.eyebrow}</p>
			<RichText field={slice.primary.title} />
			<RichText field={slice.primary.text} />
			<PrismicNextImage field={slice.primary.image} />
		</section>
	);
};

export default Feature;
