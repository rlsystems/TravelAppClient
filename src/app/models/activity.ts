export interface Activity {
    id: string;
    title: string;
    date: Date | null; //used to be string
    description: string;
    category: string;
    city: string;
    venue: string;
  }