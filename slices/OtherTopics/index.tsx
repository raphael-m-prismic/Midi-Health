import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { RichText } from "@/components/RichText";
import { OtherTopicsCarousel } from "./OtherTopicsCarousel";

/**
 * Props for `OtherTopics`.
 */
export type OtherTopicsProps = SliceComponentProps<Content.OtherTopicsSlice>;

/**
 * Component for "OtherTopics" Slices. Server component: renders the heading
 * block and hands the items off to the interactive `OtherTopicsCarousel`.
 */
const OtherTopics: FC<OtherTopicsProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="w-full"
		>
			<div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12 lg:px-16 md:py-24">
				{/* Heading block */}
				<div className="flex flex-col">
					{slice.primary.eyebrow && (
						<p className="mb-5 text-sm font-semibold uppercase tracking-widest text-neutral-900">
							{slice.primary.eyebrow}
						</p>
					)}
					<RichText field={slice.primary.title} />
					{slice.primary.text && <RichText field={slice.primary.text} />}
				</div>

				{/* Carousel */}
				<OtherTopicsCarousel items={slice.primary.items ?? []} />
			</div>
		</section>
	);
};

export default OtherTopics;
