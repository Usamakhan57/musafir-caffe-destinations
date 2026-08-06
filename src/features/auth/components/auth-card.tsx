import Link from "next/link";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: {
    text: string;
    linkText: string;
    href: string;
  };
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8 rounded-2xl border border-cream-200 bg-cream-50 p-8 shadow-card">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-serif text-2xl font-semibold text-coffee-900">{title}</h1>
        <p className="text-sm text-coffee-500">{description}</p>
      </div>
      {children}
      {footer && (
        <p className="text-center text-sm text-coffee-500">
          {footer.text}{" "}
          <Link href={footer.href} className="font-medium text-forest-600 hover:text-forest-700">
            {footer.linkText}
          </Link>
        </p>
      )}
    </div>
  );
}
