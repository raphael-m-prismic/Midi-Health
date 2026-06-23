import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `Faq`.
 */
export type FaqProps = SliceComponentProps<Content.FaqSlice>;

/**
 * Component for "Faq" Slices.
 */
const Faq: FC<FaqProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<p>{slice.primary.eyebrow}</p>
			<PrismicRichText field={slice.primary.title} />
			<PrismicRichText field={slice.primary.text} />
			<ul>
				{slice.primary.questions.map((item, index) => (
					<li key={index}>
						<h3>{item.question}</h3>
						<PrismicRichText field={item.answer} />
					</li>
				))}
			</ul>
			{slice.primary.cta.map((link, index) => (
				<PrismicNextLink key={index} field={link} />
			))}
		</section>
	);
};

export default Faq;
