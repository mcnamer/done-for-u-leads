import { cn } from '@/lib/utils';

/**
 * Google Drive video player. The file must be shared as "Anyone with the link".
 * Drive ignores autoplay, so a click-to-load poster would make visitors click twice.
 * shortcut: Drive can throttle playback under heavy traffic, move to a video host if it does.
 */
export function VideoEmbed({
  id,
  title = 'Watch the video',
  className,
}: {
  id: string;
  title?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'slab relative aspect-video w-full overflow-hidden rounded-[1.25rem] bg-dark',
        className,
      )}
    >
      <iframe
        className="absolute inset-0 size-full"
        src={`https://drive.google.com/file/d/${id}/preview`}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    </div>
  );
}
