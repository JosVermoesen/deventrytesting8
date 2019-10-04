export interface JournalEntry {
  id: string;
  description: string;
  date: any;
  dcOption: string; //
  amount: number;
  bNumber: string; // booking number
  tNumber?: string; // t booking number
}
