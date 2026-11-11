const HYGRAPH_ASSET =
  /^(?<base>https:\/\/[^/]+\.graphassets\.com\/[^/]+)\/(?<handle>[^/]+)$/u;

/**
 * Hygraph asset URL with a transformation, e.g. `resize=width:900/output=format:png`.
 * Returns `null` for anything that is not a Hygraph asset (local sample images).
 */
export function hygraphTransform(url: string | undefined, transform: string) {
  const groups = url?.match(HYGRAPH_ASSET)?.groups;
  return groups ? `${groups.base}/${transform}/${groups.handle}` : null;
}
