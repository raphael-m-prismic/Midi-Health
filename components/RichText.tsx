import { PrismicRichText } from "@prismicio/react";
import type { RichTextField } from "@prismicio/client";
import type { RichTextComponents } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

const serif = "font-[family-name:var(--font-source-serif)]";

type Props = {
  field: RichTextField;
  components?: RichTextComponents;
  additionalClassNames?: string;
};

export function RichText({ field, components, additionalClassNames }: Props) {
  const defaultComponents: RichTextComponents = {
    heading1: ({ children }) => (
      <h1 className={clsx(serif, "mb-5 md:mb-6 text-5xl md:text-6xl font-semibold text-neutral-900", additionalClassNames)}>{children}</h1>
    ),
    heading2: ({ children }) => (
      <h2 className={clsx(serif, "mb-5 md:mb-6 text-4xl font-semibold text-neutral-900", additionalClassNames)}>{children}</h2>
    ),
    heading3: ({ children }) => (
      <h3 className={clsx(serif, "mb-3 md:mb-4 text-xl md:text-2xl font-semibold text-neutral-900", additionalClassNames)}>{children}</h3>
    ),
    heading4: ({ children }) => (
      <h4 className={clsx(serif, "mb-3 md:mb-4 text-lg md:text-xl font-semibold text-neutral-900", additionalClassNames)}>{children}</h4>
    ),
    heading5: ({ children }) => (
      <h5 className={clsx(serif, "mb-2 text-base md:text-lg font-semibold text-neutral-900", additionalClassNames)}>{children}</h5>
    ),
    heading6: ({ children }) => (
      <h6 className={clsx(serif, "mb-2 text-sm md:text-base font-semibold text-neutral-900", additionalClassNames)}>{children}</h6>
    ),
    paragraph: ({ children }) => (
      <p className={clsx("mb-4 text-base text-neutral-900", additionalClassNames)}>{children}</p>
    ),
    strong: ({ children }) => <strong className={clsx("font-bold", additionalClassNames)}>{children}</strong>,
    em: ({ children }) => <em className={clsx("italic", additionalClassNames)}>{children}</em>,
    hyperlink: ({ node, children }) => (
      <PrismicNextLink field={node.data} className={clsx("text-neutral-900 underline", additionalClassNames)}>{children}</PrismicNextLink>
    ),
    list: ({ children }) => (
      <ul className={clsx("mb-4 list-disc pl-6 text-neutral-900", additionalClassNames)}>{children}</ul>
    ),
    listItem: ({ children }) => <li className={clsx("mb-2", additionalClassNames)}>{children}</li>,
    oList: ({ children }) => (
      <ol className={clsx("mb-4 list-decimal pl-6 text-neutral-900", additionalClassNames)}>{children}</ol>
    ),
    oListItem: ({ children }) => <li className={clsx("mb-2", additionalClassNames)}>{children}</li>,
    preformatted: ({ children }) => (
      <pre className={clsx("mb-4 overflow-x-auto rounded bg-neutral-100 p-4 text-sm text-neutral-900", additionalClassNames)}>{children}</pre>
    ),
    image: ({ node }) => (
      <figure className={clsx("my-6", additionalClassNames)}>
        <img src={node.url} alt={node.alt ?? ""} className="w-full rounded object-cover" />
        {node.alt && <figcaption className="mt-2 text-center text-sm text-neutral-900">{node.alt}</figcaption>}
      </figure>
    ),
    embed: ({ node }) => (
      <div className={clsx("my-6", additionalClassNames)} dangerouslySetInnerHTML={{ __html: node.oembed.html ?? "" }} />
    ),
    ...components,
  };

  return <PrismicRichText field={field} components={defaultComponents} />;
}
