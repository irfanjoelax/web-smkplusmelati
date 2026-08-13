import Link from "next/link";
import ClayCard from "./ClayCard";
import LocalImage from "./LocalImage";

type ImageCardProps = {
  src: string;
  alt: string;
  title: string;
  description?: string;
  href?: string;
  aspect?: string;
};

export default function ImageCard({
  src,
  alt,
  title,
  description,
  href,
  aspect = "aspect-[4/3]",
}: ImageCardProps) {
  const content = (
    <ClayCard hover className="flex h-full flex-col overflow-hidden p-3">
      <div className={`overflow-hidden rounded-[1.4rem] bg-primary-soft/60 ${aspect}`}>
        <LocalImage
          src={src}
          alt={alt}
          width={800}
          height={600}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="px-2 pb-2 pt-4">
        <h3 className="text-base font-extrabold text-primary-dark group-hover:text-primary">
          {title}
        </h3>
        {description && (
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">
            {description}
          </p>
        )}
      </div>
    </ClayCard>
  );

  if (href) {
    return (
      <Link href={href} className="group block h-full">
        {content}
      </Link>
    );
  }
  return <div className="group h-full">{content}</div>;
}
