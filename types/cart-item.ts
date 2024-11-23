import { IPizza } from "./pizza";
import { IPizzaSize } from "./size";
import { ITopping } from "./topping";

// Cart Item represents a specific configuration of a pizza
export interface ICartItem {
  $id: string;
  pizzas: Omit<IPizza, '$createdAt' | '$updatedAt'>;
  selectedSize: IPizzaSize;
  selectedToppings: ITopping[];
  quantity: number;
  totalPrice: number;
};