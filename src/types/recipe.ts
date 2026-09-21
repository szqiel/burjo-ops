export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  primary: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  category: string;
  cookTime: string;
  heatLevel: string;
  ingredients: Ingredient[];
  platingNotes: string;
  description?: string;
}
