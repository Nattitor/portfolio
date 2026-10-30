import { ExternalLink, Code2 } from "lucide-react";

export function ActionLink({ href, type, label, accessibleLabel }: {
  href: string;
  type: "primary" | "secondary";
  label: string;
  accessibleLabel: string;
}) {
  const Icon = type === "primary" ? ExternalLink : Code2;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={accessibleLabel}
      className={`project-action${type === "primary" ? " project-action-primary" : ""}`}>
      {label}<Icon aria-hidden="true" size={16} />
    </a>
  );
}
