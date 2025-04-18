
import { CartItemType } from "@/components/cart/types";

// Cart operations
export const getCartFromStorage = (): CartItemType[] => {
  try {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error getting cart from storage:", error);
    return [];
  }
};

export const saveCartToStorage = (cart: CartItemType[]) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
    // Dispatch custom event
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (error) {
    console.error("Error saving cart to storage:", error);
  }
};

export const addToCart = (item: CartItemType) => {
  try {
    const cart = getCartFromStorage();
    
    // Check if product already exists in cart with the same color and size
    const existingItemIndex = cart.findIndex(
      cartItem => cartItem.id === item.id && 
      cartItem.color === item.color && 
      cartItem.size === item.size
    );
    
    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      cart[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item to cart
      cart.push(item);
    }
    
    saveCartToStorage(cart);
    return true;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return false;
  }
};

// Wishlist operations
export const getWishlistFromStorage = (): string[] => {
  try {
    const wishlistData = localStorage.getItem('wishlist');
    return wishlistData ? JSON.parse(wishlistData) : [];
  } catch (error) {
    console.error("Error getting wishlist from storage:", error);
    return [];
  }
};

export const saveWishlistToStorage = (wishlist: string[]) => {
  try {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    // Dispatch custom event
    window.dispatchEvent(new Event('wishlistUpdated'));
  } catch (error) {
    console.error("Error saving wishlist to storage:", error);
  }
};

export const toggleWishlistItem = (productId: string): boolean => {
  try {
    const wishlist = getWishlistFromStorage();
    const isInWishlist = wishlist.includes(productId);
    
    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter(id => id !== productId);
      saveWishlistToStorage(updatedWishlist);
      return false; // No longer in wishlist
    } else {
      // Add to wishlist
      wishlist.push(productId);
      saveWishlistToStorage(wishlist);
      return true; // Now in wishlist
    }
  } catch (error) {
    console.error("Error toggling wishlist item:", error);
    return false;
  }
};
