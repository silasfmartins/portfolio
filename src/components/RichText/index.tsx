import { ComponentProps } from 'react'
import { RichText as CMSRichText } from '@graphcms/rich-text-react-renderer'

type RichTextProps = ComponentProps<typeof CMSRichText>

export function RichText({ ...props }: RichTextProps) {
  return (
    <CMSRichText
      {...props}
      renderers={{
        bold: ({ children }) => (
          <b className="font-medium text-gray-950 dark:text-gray-50">
            {children}
          </b>
        ),
        ul: ({ children }) => (
          <ul className="mt-7 flex list-inside list-disc flex-col gap-1 pl-2">
            {children}
          </ul>
        ),
        a: ({ children, ...props }) => (
          <a
            {...props}
            className="underline transition-colors hover:text-emerald-500"
          >
            {children}
          </a>
        ),
      }}
    />
  )
}
