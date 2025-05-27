import Link from "next/link";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="breadcrumb mb-8 text-lg flex items-center">
      {items.map((item, index) => (
        <span key={index} className="flex items-center">
          {item.href ? (
            <Link href={item.href} className="text-[#7b97aa] hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white/60">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="text-white/50 mx-2">/</span>}
        </span>
      ))}
    </div>
  );
}
