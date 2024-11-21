import { IOrder } from "@/types/order";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { ID } from "node-appwrite";
import { ICartItem } from "@/types/cart-item";


export const createOrderWithCartItems = async (
  cartItems: Omit<ICartItem, '$id'>[], 
  orderData: Omit<IOrder, '$id' | '$createdAt' | '$updatedAt' | 'items'>
) => {
  try {
    const { databases } = await createAdminClient();
    
    // First, create cart items
    const createdCartItems = await Promise.all(
      cartItems.map(async (cartItem) => {
        const createdCartItem = await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.cartItemsCollectionId,
          ID.unique(),
          cartItem
        );
        return createdCartItem;
      })
    );

    // Then create order with references to cart items
    const newOrder = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.ordersCollectionId,
      ID.unique(),
      {
        ...orderData,
        items: createdCartItems.map(item => item.$id)
      }
    );
    
    return { order: newOrder, cartItems: createdCartItems };
  } catch (error) {
    console.error('Error creating order with cart items:', error);
    throw error;
  }
};

export const updateOrder = async (
  orderId: string, 
  updates: Partial<Pick<IOrder, 'status' | 'paymentStatus'>>
) => {
  try {
    const { databases } = await createAdminClient();
    
    const updatedOrder = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.ordersCollectionId,
      orderId,
      updates
    );
    
    return updatedOrder;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};