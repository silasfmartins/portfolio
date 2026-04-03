interface CMSIconProps {
  icon: string;
}

function sanitizeIconMarkup(icon: string): string {
  return icon
    .replace(/<script[\s\S]*?(?:<\/script>|$)/gi, "")
    .replace(/\son\w+=(?:"[^"]*"|'[^']*')/gi, "")
    .replace(/javascript:/gi, "");
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
