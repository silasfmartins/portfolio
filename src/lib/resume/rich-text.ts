import type { RichTextContent } from "@graphcms/rich-text-types";

interface RichNode {
  children?: RichNode[];
  text?: string;
}

function nodeText(node: RichNode): string {
  return node.text ?? (node.children ?? []).map(nodeText).join("");
}

/** Hygraph rich text as plain paragraphs, for the PDF. */
export function richTextToParagraphs(content: RichTextContent | undefined) {
  const root = content as unknown as RichNode | RichNode[] | undefined;
  const blocks = Array.isArray(root) ? root : (root?.children ?? []);

  return blocks
    .map(nodeText)
    .map((text) => text.trim())
    .filter(Boolean);
}
