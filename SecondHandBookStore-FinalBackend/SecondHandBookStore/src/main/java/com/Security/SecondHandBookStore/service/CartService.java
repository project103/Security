package com.Security.SecondHandBookStore.service;

import com.Security.SecondHandBookStore.entity.Cart;
import com.Security.SecondHandBookStore.responseAndRequest.CartRequest;

public interface CartService {
	
	Cart getCart(Long id);
	
	Cart getCartByUser(Long id);
	
	Cart addCartItem(CartRequest cartRequest);
	
	Cart increaseQuantity(Long productId,Long userId);
	
	Cart decreaseQuantity(Long productId,Long userId);
	
	Cart removeProduct(Long productId,Long userId);
	
}
