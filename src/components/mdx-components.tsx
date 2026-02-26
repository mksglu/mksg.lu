import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1 className="text-2xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-xl font-bold mt-6 mb-3" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-lg font-semibold mt-5 mb-2" {...props} />
  ),
  a: (props) => (
    <a
      className="text-primary underline underline-offset-4 hover:text-primary/80"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  // rehype-pretty-code handles pre/code styling via data attributes
  pre: ({ children, ...props }) => (
    <pre
      className="overflow-x-auto rounded-md border border-border bg-[#fff] p-4 text-sm [&>code]:grid [&>code]:bg-transparent [&>code]:p-0 [&>code]:border-0"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ children, ...props }) => {
    // rehype-pretty-code adds data-theme to code blocks
    const isCodeBlock = "data-theme" in props;
    if (!isCodeBlock) {
      return (
        <code
          className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono before:content-none after:content-none"
          {...props}
        >
          {children}
        </code>
      );
    }
    return <code {...props}>{children}</code>;
  },
  // rehype-pretty-code generates spans with data-line
  span: ({ children, ...props }) => {
    if ("data-line" in props) {
      return (
        <span className="px-0" {...props}>
          {children}
        </span>
      );
    }
    return <span {...props}>{children}</span>;
  },
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-muted-foreground/30 pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
  table: (props) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border border-border bg-muted px-3 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border border-border px-3 py-2" {...props} />
  ),
};
