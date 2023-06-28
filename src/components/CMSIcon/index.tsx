interface CMSIconProps {
  icon: string
}

export function CMSIcon({ icon }: CMSIconProps) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: icon,
      }}
    />
  )
}
