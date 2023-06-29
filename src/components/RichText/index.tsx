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
      }}
    />
  )
}
