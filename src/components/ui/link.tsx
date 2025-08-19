import React from "react";
import Link, { LinkProps } from "next/link";

interface AppLinkProps extends LinkProps {
  text: string;
}

function AppLink({ text, href }: AppLinkProps) {
  return (
    <span>
      <Link
        className="group cursor-pointer py-2 w-max"
        scroll={false}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        <span className="relative after:absolute after:inset-x-0 after:bottom-0 after:h-[1px] after:w-full after:origin-right after:scale-x-0 after:bg-[linear-gradient(90deg,_transparent,_#000000_0%_100%,_transparent)] after:to-transparent after:transition-[transform] after:duration-300 after:group-hover:origin-left after:group-hover:scale-x-[1] dark:after:bg-[linear-gradient(90deg,_transparent,_#ffffff_0%_100%,_transparent)]">
          {text}
        </span>
      </Link>
    </span>
  );
}

export default AppLink;
