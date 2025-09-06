import type { CampFormData } from "../types/camp.types";

export const validateForm = (formData: CampFormData): Record<string, string> => {
  const newErrors: Record<string, string> = {};

  // Required field validation
  if (!formData.name.trim()) newErrors.name = 'Camp name is required';
  if (!formData.location.trim()) newErrors.location = 'Location is required';
  if (!formData.organizer.trim()) newErrors.organizer = 'Organizer is required';
  if (!formData.contact.trim()) newErrors.contact = 'Contact information is required';
  if (!formData.description.trim()) newErrors.description = 'Description is required';
  
  // Date validation
  if (isNaN(formData.date.getTime())) newErrors.date = 'Valid start date is required';
  
  // Duration validation
  if (formData.days < 1) newErrors.days = 'Duration must be at least 1 day';
  
  // Time validation
  if (formData.starting_time && formData.ending_time) {
    const start = new Date(`2000-01-01T${formData.starting_time}`);
    const end = new Date(`2000-01-01T${formData.ending_time}`);
    if (start >= end) newErrors.ending_time = 'End time must be after start time';
  }
  
  // Coordinate validation (optional but if provided, should be valid)
  if (formData.lat && (formData.lat < -90 || formData.lat > 90)) {
    newErrors.lat = 'Latitude must be between -90 and 90';
  }
  if (formData.lng && (formData.lng < -180 || formData.lng > 180)) {
    newErrors.lng = 'Longitude must be between -180 and 180';
  }
  
  // Contact format validation (basic)
  if (formData.contact.trim()) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    
    if (!phoneRegex.test(formData.contact.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.contact = 'Please enter a valid email or phone number';
    }

    if(formData.contact.length != 10) {
      newErrors.contact = 'Please enter a valid email or phone number';
    }
  }

  return newErrors;
};