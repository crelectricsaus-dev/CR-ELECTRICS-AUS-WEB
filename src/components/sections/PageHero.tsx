import Link from "next/link";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HeroPhoto } from "@/components/ui/HeroPhoto";
import { isOnTopicPhoto, type PlaceholderPhotoKey } from "@/lib/placeholder-photos";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  photo,
  photoSrc,
  photoAlignRight = false,
  photoPosition,
}: {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: { name: string; href: string }[];
  /** Curated stock-photo key used until `photoSrc` exists in /public. */
  photo?: PlaceholderPhotoKey;
  /** Real branded photo path to use once available, e.g. "/images/hero-about.jpg". */
  photoSrc?: string;
  /** Push the photo's subject toward the right and darken the left so it doesn't sit behind the text. */
  photoAlignRight?: boolean;
  /** Explicit object-position override, e.g. "object-[center_70%]". Takes precedence over photoAlignRight's default. */
  photoPosition?: string;
}) {
  const onTopic = photo ? isOnTopicPhoto(photo) : false;

  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-16 sm:pb-24 sm:pt-20">
      {photo && (
        <div className="pointer-events-none absolute inset-0">
          <HeroPhoto
            src={photoSrc ?? `/images/hero-${photo}-unset.jpg`}
            alt=""
            placeholder={photo}
            className={clsx(
              onTopic ? "opacity-70" : "opacity-35",
              photoPosition ?? (photoAlignRight && "object-[75%_center]")
            )}
            priority={false}
          />
          <div
            className={clsx(
              "absolute inset-0 bg-gradient-to-t",
              onTopic ? "from-ink via-ink/75 to-ink/30" : "from-ink via-ink/85 to-ink/50"
            )}
          />
          {photoAlignRight && <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-ink/10" />}
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-electric/25 blur-[120px]" />
      <div className="bg-noise absolute inset-0" />
      <Container className="relative">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium text-white/50">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-2">
              {i > 0 && <ChevronRight className="size-3" />}
              {i === breadcrumbs.length - 1 ? (
                <span className="text-white/80">{crumb.name}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-white">
                  {crumb.name}
                </Link>
              )}
            </span>
          ))}
        </nav>
        <div className="mb-4 inline-flex items-center gap-2">
          <span className="h-px w-8 bg-electric" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-electric-light">{eyebrow}</span>
        </div>
        <h1 className="max-w-4xl font-display text-4xl font-extrabold tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">{description}</p>
      </Container>
    </section>
  );
}
