import Image from "next/image";

// Original Vellura brand asset; this is not a screenshot of the application.
export function ProjectCover() {
  return (
    <div aria-hidden="true" className="project-cover project-cover-vellura">
      <Image
        src="/images/projects/vellura-logo.svg"
        alt=""
        width={164}
        height={120}
        className="vellura-logo"
      />
      <span className="project-cover-wordmark">Vellura</span>
    </div>
  );
}
