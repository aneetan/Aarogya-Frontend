export interface Camp {
   id: number;
   name: string;
   location: string;
   organizer: string;
   contact: string;
   description: string;
   date: Date;
   days: number;
   starting_time: string,
   ending_time: string,
   lat: number;
   lng: number;
}

export type CampFormData = Omit<Camp, 'id'>;