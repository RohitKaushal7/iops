import { Image } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAppStore } from "@/lib/app.store";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  const { apiBaseUrl, setApiBaseUrl } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempUrl, setTempUrl] = useState(apiBaseUrl);

  const handleEdit = () => {
    setIsEditing(true);
    setTempUrl(apiBaseUrl);
  };

  const handleSave = () => {
    setApiBaseUrl(tempUrl);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setTempUrl(apiBaseUrl);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-4 py-3">
        <Link className="flex items-center gap-2 font-bold text-lg" to="/">
          <Image size={28} weight="duotone" />
          <span>iOps</span>
        </Link>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <input
              autoFocus
              className="rounded-md border bg-background px-2 py-1 font-mono text-xs outline-none focus:border-primary"
              onBlur={handleSave}
              onChange={(e) => setTempUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter API Base URL (e.g. http://localhost:8080)"
              type="text"
              value={tempUrl}
            />
          ) : (
            <button
              className="cursor-pointer rounded-md px-2 py-1 font-mono text-muted-foreground text-xs transition-colors hover:bg-muted hover:text-foreground"
              onClick={handleEdit}
              type="button"
            >
              {apiBaseUrl || "⚠️ Click to set API URL"}
            </button>
          )}
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}
