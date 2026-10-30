interface CMSIconProps {
  icon: string;
}

function sanitizeIconMarkup(icon: string): string {
  return icon
    .replace(/<script[\s\S]*?(?:<\/script>|$)/giu, "")
    .replace(/\son\w+=(?:"[^"]*"|'[^']*')/giu, "")
    .replace(/javascript:/giu, "");
}

export function CMSIcon({ icon }: CMSIconProps) {
  const safeIcon = sanitizeIconMarkup(icon);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: safeIcon,
      }}
    />
  );
}
