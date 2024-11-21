import { IPizza } from "./pizza";

// Cart Item represents a specific configuration of a pizza
interface ICartItem {
  $id: string;
  pizza: IPizza;
  selectedSize: IPizzaSize;
  selectedToppings: ITopping[];
  quantity: number;
  totalPrice: number;
};