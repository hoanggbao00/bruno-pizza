interface IPizza {
	id: string;
	name: string;
	description: string;
	price: number;
	images: string[];
	toppings: ITopping[];
	sizes: IPizzaSize[];
	isVegetarian: boolean;
	createdAt: Date;
	updatedAt: Date;
}
