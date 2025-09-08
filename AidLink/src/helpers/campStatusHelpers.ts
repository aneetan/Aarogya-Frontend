import type { Camp } from '../types/camp.types';

export type CampStatus = 'active' | 'upcoming' | 'expired';

export interface CampStatusInfo {
  status: CampStatus;
  label: string;
}

export const getCampStatus = (camp: Camp): CampStatusInfo => {
  const today = new Date();
  const campDate = new Date(camp.date);
  
  today.setHours(0, 0, 0, 0);
  campDate.setHours(0, 0, 0, 0);
  
  const campEndDate = new Date(campDate);
  campEndDate.setDate(campEndDate.getDate() + (camp.days || 1));
  
  if (today >= campDate && today <= campEndDate) {
    return { status: 'active', label: 'Active' };
  } else if (today > campEndDate) {
    return { status: 'expired', label: 'Expired' };
  } else {
    return { status: 'upcoming', label: 'Upcoming' };
  }
};

export const getStatusBadgeClass = (status: CampStatus | string): string => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'upcoming':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'expired':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const isCampActive = (camp: Camp): boolean => {
  return getCampStatus(camp).status === 'active';
};

export const isCampUpcoming = (camp: Camp): boolean => {
  return getCampStatus(camp).status === 'upcoming';
};

export const isCampExpired = (camp: Camp): boolean => {
  return getCampStatus(camp).status === 'expired';
};