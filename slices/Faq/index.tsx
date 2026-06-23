import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { RichText } from "@/components/RichText";
import { FaqAccordion } from "./FaqAccordion";

/**
 * Props for `Faq`.
 */
export type FaqProps = SliceComponentProps<Content.FaqSlice>;

/**
 * Component for "Faq" Slices.
 */
const Faq: FC<FaqProps> = ({ slice }) => {
	const cta = slice.primary.cta ?? [];

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<div className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 py-16 md:grid-cols-2 md:gap-16 md:px-12 lg:px-16 md:py-24">
				{/* Left column: title block */}
				<div className="flex flex-col justify-start">
					{slice.primary.eyebrow && (
						<p className="mb-5 text-sm font-semibold uppercase tracking-widest text-neutral-900">
							{slice.primary.eyebrow}
						</p>
					)}
					<RichText field={slice.primary.title} />
					{slice.primary.text && <RichText field={slice.primary.text} />}
				</div>

				{/* Right column: accordion + cta */}
				<div className="flex flex-col">
					<FaqAccordion questions={slice.primary.questions ?? []} />
					{cta.length > 0 && (
						<ul className="mt-8 flex flex-wrap gap-4">
							{cta.map((link, index) => (
								<li key={index}>
									<PrismicNextLink
										field={link}
										className="inline-block rounded-xl border border-neutral-900 px-8 py-4 font-semibold text-neutral-900"
									/>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</section>
	);
};

export default Faq;
