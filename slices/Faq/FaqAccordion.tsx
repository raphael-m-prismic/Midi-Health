"use client";

import { useState } from "react";
import { Content } from "@prismicio/client";
import clsx from "clsx";
import { RichText } from "@/components/RichText";

type Props = {
	questions: Content.FaqSliceDefaultPrimaryQuestionsItem[];
};

export function FaqAccordion({ questions }: Props) {
	// Allow a single open item at a time; default the first item to open.
	const [openIndex, setOpenIndex] = useState(0);

	if (questions.length === 0) return null;

	return (
		<div className="flex flex-col gap-4">
			{questions.map((item, index) => {
				const isOpen = index === openIndex;
				const panelId = `faq-panel-${index}`;
				const buttonId = `faq-button-${index}`;

				return (
					<div
						key={index}
						className="border border-neutral-900 p-6"
					>
						<button
							type="button"
							id={buttonId}
							aria-expanded={isOpen}
							aria-controls={panelId}
							onClick={() => setOpenIndex(isOpen ? -1 : index)}
							className="flex w-full items-center justify-between gap-4 text-left text-lg font-semibold text-neutral-900"
						>
							<span>{item.question}</span>
							<span
								aria-hidden="true"
								className={clsx(
									"text-2xl leading-none transition-transform duration-300 ease-out motion-reduce:transition-none",
									isOpen ? "rotate-45" : "rotate-0",
								)}
							>
								+
							</span>
						</button>
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
										"pt-4 transition-opacity duration-300 ease-out motion-reduce:transition-none",
										isOpen ? "opacity-100" : "opacity-0",
									)}
								>
									<RichText field={item.answer} />
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
