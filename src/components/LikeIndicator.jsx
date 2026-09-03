import { useLikeCount } from "../hooks/useLikeCount";

export default function LikeIndicator({ slug, className = "" }) {
  const { liked, likes } = useLikeCount(slug);

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold ${
        liked ? "text-lagune-dark" : "text-ink/40"
      } ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          d="M12 20.5S3.5 15 3.5 9a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20.5 9c0 6-8.5 11.5-8.5 11.5Z"
          strokeLinejoin="round"
        />
      </svg>
      {likes}
    </span>
  );
}
