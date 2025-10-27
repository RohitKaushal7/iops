import { Image } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between px-4 py-3">
        <Link className="flex items-center gap-2 font-bold text-lg" to="/">
          <Image size={28} weight="duotone" />
          <span>iOps</span>
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}
