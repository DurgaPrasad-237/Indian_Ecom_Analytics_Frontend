interface PageHeaderProps {
  title: string;
  description?: string;
}

/** Section heading used at the top of in-page content blocks (distinct from the sticky top Header). */
export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-5">
      <h2 className="text-display-md font-semibold text-ink-900">{title}</h2>
      {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
    </div>
  );
}
