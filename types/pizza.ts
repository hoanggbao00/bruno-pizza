import { ITopping } from "./topping";

// Enum for Pizza Stock Status
export enum EPizzaStockStatus {
	IN_STOCK = 'IN_STOCK',
	LOW_STOCK = 'LOW_STOCK',
	OUT_OF_STOCK = 'OUT_OF_STOCK',
	DISCONTINUED = 'DISCONTINUED',
}

export interface IPizza {
	$id: string;
	name: string;
	category: ICategory;
	description?: string;
	price: number;
	images: string[];
	toppings: ITopping[];
	sizes: IPizzaSize[];

	stockStatus: EPizzaStockStatus;
	currentStockQuantity: number;

	isBestSeller: boolean;
	isAvailable: boolean;
	$createdAt: string;
	$updatedAt: string;
}
