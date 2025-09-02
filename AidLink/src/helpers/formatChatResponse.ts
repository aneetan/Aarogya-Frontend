export function formatChatResponse(text: string): string {
  if (!text) return '';
  
  let formatted = text;
  
  // Add proper spacing after section headers
  formatted = formatted.replace(/(WARNINGS|STEPS|ADDITIONAL NOTES):/gi, '\n\n$1:\n\n');
  
  // Ensure proper spacing for step numbers
  formatted = formatted.replace(/(\d+)\.\s+/g, '\n\n$1. ');
  
  // Add spacing between sentences (after periods that are not in abbreviations)
  formatted = formatted.replace(/([.!?])\s+([A-Z])/g, '$1\n\n$2');
  
  // Clean up any excessive newlines
  formatted = formatted.replace(/\n{3,}/g, '\n\n');
  
  // Trim and ensure it starts clean
  return formatted.trim();
}