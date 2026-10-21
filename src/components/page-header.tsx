interface PageHeaderProps {
  title: string;
  id?: string;
  className?: string;
}

export function PageHeader({ title, id, className = "" }: PageHeaderProps) {
  return (
    <header className={`page-header pt-2 pb-2 text-center ${className}`.trim()}>
      <h1
        id={id}
        className="page-header__title text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl dark:text-white"
      >
        {title}
      </h1>
    </header>
  );
}
