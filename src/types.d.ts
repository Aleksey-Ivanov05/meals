export interface MealType {
  id: string;
  time: string;
  date: string;
  description: string;
  calories: number;
}

export interface MealDateNumber {
  id: string;
  time: string;
  date: number;
  description: string;
  calories: number;
}

export type MealApi = Omit<MealType, 'id'>;

export interface MealMutation {
  time: string;
  description: string;
  calories: string;
  date: string;
}

export interface MealsList {
  [id: string]: MealApi;
}