import React, { useMemo, useState } from "react";

const SIZE_CLASSES = {
  sm: "w-9 h-9 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-14 h-14 text-base",
};

const getInitials = (name = "User") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";

function Avatar({ src, name, size = "md", alt = "avatar" }) {
  const [failedSrcs, setFailedSrcs] = useState(() => new Set());

  const initials = useMemo(() => getInitials(name), [name]);
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;
  const hasError = !src || failedSrcs.has(src);

  if (hasError) {
    return (
      <div
        className={`${sizeClass} rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 text-white font-semibold flex items-center justify-center border border-slate-600`}
        aria-label={alt}
        title={name}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      title={name}
      onError={() => {
        setFailedSrcs((prev) => {
          const next = new Set(prev);
          next.add(src);
          return next;
        });
      }}
      className={`${sizeClass} rounded-full object-cover border border-slate-600`}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
}

export default Avatar;
