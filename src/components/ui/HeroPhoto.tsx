import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import clsx from "clsx";
import { isOnTopicPhoto, photoUrl, type PlaceholderPhotoKey } from "@/lib/placeholder-photos";

export function HeroPhoto({
  src,
  alt,
  className,
  priority = true,
  placeholder,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  /** Curated stock-photo key to use until a real branded photo replaces `src`. */
  placeholder?: PlaceholderPhotoKey;
}) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", src));

  if (exists) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className={clsx("object-cover", className)}
      />
    );
  }

  if (placeholder) {
    const onTopic = isOnTopicPhoto(placeholder);
    return (
      <div className="absolute inset-0 overflow-hidden bg-ink">
        <Image
          src={photoUrl(placeholder)}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className={clsx("object-cover", !onTopic && "grayscale", className)}
        />
        {!onTopic && (
          <>
            <div className="absolute inset-0 bg-electric mix-blend-color opacity-70" />
            <div className="absolute inset-0 bg-ink/55" />
          </>
        )}
      </div>
    );
  }

  return (
    <div className={clsx("absolute inset-0 bg-gradient-to-br from-charcoal via-ink to-charcoal-2", className)}>
      <div className="bg-grid absolute inset-0 opacity-30" />
    </div>
  );
}
