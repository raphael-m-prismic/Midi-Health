"use client";

import { useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicText, type RichTextComponents } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { RichText } from "@/components/RichText";

const serif = "font-[family-name:var(--font-source-serif)]";

type Props = {
	plans: Content.CarePlanSliceDefaultPrimaryPlansItem[];
};

/**
 * Panel rich text: stack paragraphs and divide them with hairline rules,
 * matching the reference where an open panel shows blocks split by thin lines.
 */
const panelComponents: RichTextComponents = {
	paragraph: ({ children }) => (
		<p className="border-t border-black pt-4 text-[#2B2B2B] leading-relaxed first:border-t-0 first:pt-0">
			{children}
		</p>
	),
};

export function CarePlanAccordion({ plans }: Props) {
	// Single open item at a time; the first item is open by default.
	const [openIndex, setOpenIndex] = useState(0);

	if (plans.length === 0) return null;

	return (
		<div className="flex flex-col">
			{plans.map((item, index) => {
				const isOpen = index === openIndex;
				const panelId = `care-plan-panel-${index}`;
				const buttonId = `care-plan-button-${index}`;

				return (
					<div key={index} className="border-t border-black last:border-b">
						<h3>
							<button
								type="button"
								id={buttonId}
								aria-expanded={isOpen}
								aria-controls={panelId}
								onClick={() => setOpenIndex(isOpen ? -1 : index)}
								className="flex w-full items-center gap-4 py-5 text-left"
							>
								{/* Circular outlined icon badge */}
								{item.icon?.url && (
									<PrismicNextImage
										field={item.icon}
										className="object-contain"
									/>
								)}

								{/* Item title */}
								<span className={clsx(serif, "flex-1 text-lg font-semibold text-[#2B2B2B] md:text-xl")}>
									<PrismicText field={item.title} />
								</span>

								{/* +/- toggle */}
								<span
									aria-hidden="true"
									className="shrink-0 text-2xl leading-none text-[#2B2B2B]"
								>
									{isOpen ? "−" : "+"}
								</span>
							</button>
						</h3>

						<div
							id={panelId}
							role="region"
							aria-labelledby={buttonId}
							aria-hidden={!isOpen}
							className={clsx(
								"grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
								isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
							)}
						>
							<div className="overflow-hidden">
								<div
									className={clsx(
										"flex flex-col gap-4 pb-6 pl-16 transition-opacity duration-300 ease-out motion-reduce:transition-none",
										isOpen ? "opacity-100" : "opacity-0",
									)}
								>
									<RichText field={item.text} components={panelComponents} />
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
