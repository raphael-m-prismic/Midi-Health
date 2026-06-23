import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
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
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<RichText field={slice.primary.title} />
			<RichText field={slice.primary.text} />
			<PrismicNextImage field={slice.primary.image} />
			{slice.primary.cta.map((link, index) => (
				<PrismicNextLink key={index} field={link} />
			))}
		</section>
	);
};

export default CareLineSpotlight;
