// helpers/responseFormatter.helper.ts

import type { MedicalResponse } from "../types/chat.types";

export function formatMedicalResponse(response: MedicalResponse): string {
  let formattedText = `**${response.title}**\n\n`;
  
  if (response.overview) {
    formattedText += `${response.overview}\n\n`;
  }
  
  if (response.warnings && response.warnings.length > 0) {
    formattedText += `⚠️ **WARNINGS:**\n`;
    response.warnings.forEach(warning => {
      formattedText += `• ${warning}\n`;
    });
    formattedText += '\n';
  }
  
  if (response.steps && response.steps.length > 0) {
    formattedText += `📋 **STEPS:**\n`;
    response.steps.forEach(step => {
      formattedText += `${step.step_number}. ${step.instruction}`;
      if (step.details) {
        formattedText += ` - ${step.details}`;
      }
      formattedText += '\n';
    });
    formattedText += '\n';
  }
  
  if (response.additionalNotes && response.additionalNotes.length > 0) {
    formattedText += `💡 **ADDITIONAL NOTES:**\n`;
    response.additionalNotes.forEach(note => {
      formattedText += `• ${note}\n`;
    });
    formattedText += '\n';
  }
  
  if (response.emergencyAction) {
    formattedText += `🚨 **EMERGENCY ACTION:**\n${response.emergencyAction}\n`;
  }
  
  return formattedText;
}