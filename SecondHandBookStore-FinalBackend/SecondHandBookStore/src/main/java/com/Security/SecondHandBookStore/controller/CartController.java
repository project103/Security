package com.Security.SecondHandBookStore.controller;

import com.Security.SecondHandBookStore.entity.Cart;
import com.Security.SecondHandBookStore.service.CartService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Security.SecondHandBookStore.responseAndRequest.CartRequest;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/cart/")
@CrossOrigin
public class CartController {
	
	@Autowired
	private CartService cartService;
	
	Logger logger = LoggerFactory.getLogger(CartController.class);
	
	@GetMapping(path = "/{id}")
	public Cart getCart(@PathVariable Long id) {
		logger.info("getting the Cart Details By cart Id");
		return cartService.getCart(id);
	}
	
	@GetMapping(path = "/user-id/{id}")
	public Cart getCartByUserId(@PathVariable Long id) {
		logger.info("getting the Cart Details By User Id");
		return cartService.getCartByUser(id);
	}
	
	
	@PostMapping(path ="/add-to-cart")
	public Cart addCartItem(@Valid @RequestBody CartRequest cartRequest) {
		logger.info("Adding the product into the cart");
		return cartService.addCartItem(cartRequest);
	}
	
	@PutMapping(path = "/increase-quantity/{productId}/{userId}")
	public Cart increaseQuantityOfProduct(@PathVariable Long productId,@PathVariable Long userId) {
		logger.info("Increasing the quantity of the product in Cart");
		return cartService.increaseQuantity(productId, userId);
		
	}
	
	@PutMapping(path = "/descrease-quantity/{productId}/{userId}")
	public Cart decreaseQuantityOfProduct(@PathVariable Long productId,@PathVariable Long userId) {
		logger.info("Decreasing the quantity of the product in Cart");
		return cartService.decreaseQuantity(productId, userId);
		
	}
	
	@DeleteMapping(path = "/remove-book/{productId}/{userId}")
	public Cart removeBook(@PathVariable Long productId,@PathVariable Long userId) {
		logger.info("Removing the product form Cart");
		return cartService.removeProduct(productId,userId);
	}

}
