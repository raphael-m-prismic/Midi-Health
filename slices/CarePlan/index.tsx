import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, type RichTextComponents } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { RichText } from "@/components/RichText";
import { CarePlanAccordion } from "./CarePlanAccordion";

const serif = "font-[family-name:var(--font-source-serif)]";

/**
 * Props for `CarePlan`.
 */
export type CarePlanProps = SliceComponentProps<Content.CarePlanSlice>;

/**
 * Component for "CarePlan" Slices.
 */
const CarePlan: FC<CarePlanProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="w-full bg-[#F4F4EC]"
		>
			<div className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 py-16 md:grid-cols-2 md:gap-16 md:px-12 lg:px-16 md:py-24">
				{/* Left column: title, text, cta */}
				<div className="flex flex-col">
					<RichText field={slice.primary.title} />
					{isFilled.richText(slice.primary.text) && (
						<div className="mt-6 max-w-md">
							<RichText field={slice.primary.text} />
						</div>
					)}
					{isFilled.link(slice.primary.cta) && (
						<div className="mt-8">
							<PrismicNextLink
								field={slice.primary.cta}
								className="inline-block rounded-lg bg-[#283e7e] px-8 py-4 font-semibold text-white transition-colors hover:bg-[#34326f]"
							/>
						</div>
					)}
				</div>

				{/* Right column: accordion */}
				<div className="flex flex-col justify-center">
					<CarePlanAccordion plans={slice.primary.plans ?? []} />
				</div>
			</div>
		</section>
	);
};

export default CarePlan;
