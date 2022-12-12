export interface MealType {
  id: string;
  time: string;
  description: string;
  calories: number;
}

export type MealApi = Omit<MealType, 'id'>;

export interface MealMutation {
  time: string;
  description: string;
  calories: string;
}

export interface MealsList {
  [id: string]: MealApi;
}