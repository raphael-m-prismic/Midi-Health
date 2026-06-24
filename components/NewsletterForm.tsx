"use client";

import { FC, FormEvent, useState } from "react";

type NewsletterFormProps = {
	placeholder?: string | null;
	ctaLabel?: string | null;
};

/**
 * Interactive newsletter sign-up form. Demo only — it does not submit anywhere;
 * on submit it shows an inline success state. Receives its labels as props.
 */
export const NewsletterForm: FC<NewsletterFormProps> = ({
	placeholder,
	ctaLabel,
}) => {
	const [submitted, setSubmitted] = useState(false);

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSubmitted(true);
	};

	if (submitted) {
		return (
			<p className="rounded-lg bg-white/10 px-4 py-3 text-sm font-medium text-stone-50">
				Thanks! You&apos;re on the list.
			</p>
		);
	}

	return (
		<form onSubmit={onSubmit} className="flex w-full max-w-sm gap-1 rounded-md border border-white overflow-hidden">
			<input
				type="email"
				required
				placeholder={placeholder || "Enter your email"}
				aria-label={placeholder || "Email address"}
				className="min-w-0 flex-1 bg-white px-4 py-2.5 text-sm text-black placeholder:text-black/50 focus:border-white/60 focus:outline-none"
			/>
			<button
				type="submit"
				className="shrink-0 bg-[#5C2018] px-5 py-3 text-sm font-semibold text-white"
			>
				{ctaLabel || "Subscribe"}
			</button>
		</form>
	);
};

export default NewsletterForm;
