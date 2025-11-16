/**
 * Converts a slug to a display name
 * Example: "length-unit-converter" -> "Length Unit Converter"
 */
export function slugToDisplayName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
