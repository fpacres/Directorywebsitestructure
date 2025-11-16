/**
 * Truncates text to a maximum length while maintaining word boundaries
 * @param text - The text to truncate
 * @param maxLength - Maximum length (default: 200)
 * @param minLength - Minimum length before truncation (default: 180)
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength = 200, minLength = 180): string {
  if (text.length <= maxLength) return text;
  
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > minLength 
    ? truncated.substring(0, lastSpace) + '...' 
    : truncated + '...';
}
