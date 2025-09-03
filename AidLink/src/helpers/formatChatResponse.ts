import type { MedicalResponse, StepProps } from "../types/chat.types";

export const formatFirstAidResponse = (response: MedicalResponse | string): string => {
  if (typeof response === 'string') {
    return response;
  }
  
  // If it doesn't have the expected structure, return a stringified version
  if (!response || typeof response !== 'object') {
    return typeof response === 'object' ? JSON.stringify(response) : String(response);
  }
  
  let formattedText = '';
  
  // Add title if available
  if (response.title) {
    formattedText += `${response.title}. `;
  }
  
  // Add overview if available
  if (response.overview) {
    formattedText += `${response.overview} `;
  }
  
  // Add warnings if available
  if (response.warnings && response.warnings.length > 0) {
    formattedText += 'Important warnings: ';
    response.warnings.forEach((warning: string) => {
      formattedText += `${warning}. `;
    });
  }
  
  // Add steps if available
  if (response.steps && response.steps.length > 0) {
    formattedText += 'Follow these steps: ';
    response.steps.forEach((step: StepProps, index: number) => {
      if (step.instruction) {
        formattedText += `Step ${step.step_number || index + 1}: ${step.instruction}. `;
        if (step.details) {
          formattedText += `${step.details}. `;
        }
      }
    });
  }
  
  // Add additional notes if available
  if (response.additionalNotes && response.additionalNotes.length > 0) {
    formattedText += 'Additional notes: ';
    response.additionalNotes.forEach((note: string) => {
      formattedText += `${note}. `;
    });
  }
  
  // Add emergency action if available
  if (response.emergencyAction) {
    formattedText += `Emergency action: ${response.emergencyAction}. `;
  }
  
  // If we couldn't extract any meaningful text, fall back to stringify
  if (formattedText.trim() === '') {
    return 'I have first aid information for you. Please view the detailed instructions on screen.';
  }
  
  return formattedText;
};