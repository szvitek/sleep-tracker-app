export type FormErrors = {
  name?: string;
  gender?: string;
  duration?: string;
};

export type Genders = 'Male' | 'Female' | 'Other';

export type TableData = {
  _id: { name: string; gender: Genders };
  count: number;
};
