import { initialsFrom } from "../lib/initials";

export default function Avatar({ user, className = "" }) {
  if (user?.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt=""
        referrerPolicy="no-referrer"
        className={`rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <span className={`flex items-center justify-center rounded-full bg-lagune font-bold text-white ${className}`}>
      {initialsFrom(user?.name, user?.email)}
    </span>
  );
}
