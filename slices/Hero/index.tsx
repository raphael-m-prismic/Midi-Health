import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<p>{slice.primary.eyebrow}</p>
			<PrismicRichText field={slice.primary.title} />
			<PrismicRichText field={slice.primary.text} />
			<PrismicNextImage field={slice.primary.image} />
			{slice.primary.cta.map((link, index) => (
				<PrismicNextLink key={index} field={link} />
			))}
		</section>
	);
};

export default Hero;
