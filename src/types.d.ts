export interface MealType {
  id: string;
  time: string;
  description: string;
  calories: number;
}

export type MealApi = Omit<MealType, 'id'>;

export interface MealsList {
  [id: string]: MealApi;
}