package com.cognizant.SecondHandBookStore.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.SecondHandBookStore.entity.Cart;
import com.cognizant.SecondHandBookStore.entity.CartItem;
import com.cognizant.SecondHandBookStore.entity.Product;
import com.cognizant.SecondHandBookStore.entity.User;
import com.cognizant.SecondHandBookStore.exception.CartNotFoundException;
import com.cognizant.SecondHandBookStore.exception.ProductAlreadyExistException;
import com.cognizant.SecondHandBookStore.exception.ProductOutOfStockException;
import com.cognizant.SecondHandBookStore.repository.CartItemRepository;
import com.cognizant.SecondHandBookStore.repository.CartRepository;
import com.cognizant.SecondHandBookStore.responseAndRequest.CartRequest;

@Service
public class CartServiceImpl implements CartService {
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private CartItemRepository cartItemRepository;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private UserService userService;
	
	
	Logger logger = LoggerFactory.getLogger(CartServiceImpl.class);
	

	@Override
	public Cart getCart(Long id) {
		Cart cart = cartRepository.findById(id)
				.orElseThrow(() -> new CartNotFoundException("Cart Not Found!"));
		
		logger.info("get the cart by ID");
		return cart;
	}

	@Override
	public Cart getCartByUser(Long id) {
		Cart cart = cartRepository.findByUserId(id);
		if(cart == null) {
			throw new CartNotFoundException("Cart Not Found!");
		}
		logger.info("get the cart by User ID");
		return cart;
		
	}
	

	@Override
	public Cart addCartItem(CartRequest cartRequest) {
		Product product = productService.getProduct(cartRequest.getProductId());
		User user = userService.getUser(cartRequest.getUserId());
		
		Cart cart = getCartByUser(user.getId());
		
		for(CartItem item:cart.getCartItems()) {
			if(item.getProduct().getId() == product.getId()) {
				throw new ProductAlreadyExistException("Product already exists of Id :" + product.getId());
			}
		}
		
		if(product.getStock() < cartRequest.getQuantity()) {
			throw new ProductOutOfStockException("Product out of stock!");
		}
		
		CartItem cartItem = new CartItem();
		cartItem.setProduct(product);
		cartItem.setQuantity(cartRequest.getQuantity());
		cartItem.setCart(cart);
		cartItemRepository.save(cartItem);
		
		cart.setCartItem(cartItem);
		
		cart.setTotalPrice(cart.getTotalPrice() + ( product.getSellPrice() * cartItem.getQuantity()));
		
		Cart saveCart = cartRepository.save(cart);
		logger.info("Product added to the cart");
		
		return saveCart;
	}
	

	@Override
	public Cart increaseQuantity(Long productId,Long userId) {
		Product product = productService.getProduct(productId);
		User user = userService.getUser(userId);
		Cart cart = getCartByUser(user.getId());
		
		CartItem cartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(),productId);
		
		if(product.getStock() < cartItem.getQuantity() + 1) {
			throw new ProductOutOfStockException("Product out of stock!");
		}
		
		cart.setTotalPrice(cart.getTotalPrice() + product.getSellPrice());
		cartItem.setQuantity(cartItem.getQuantity() + 1);
		cartItemRepository.save(cartItem);
		
		Cart updatedCart = cartRepository.save(cart);
		logger.info("Product quantity increase in Cart.");
		
		return updatedCart;	
	}

	@Override
	public Cart decreaseQuantity(Long productId,Long userId) {
		Product product = productService.getProduct(productId);
		User user = userService.getUser(userId);
		
		Cart cart = getCartByUser(user.getId());
		CartItem cartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(),productId);
		
		if(cartItem.getQuantity() == 1) {
			return removeProduct(productId,userId);
		}
		
		cartItem.setQuantity(cartItem.getQuantity() - 1);
		cart.setTotalPrice(cart.getTotalPrice() - product.getSellPrice());
		cartItemRepository.save(cartItem);
		
		Cart updatedCart = cartRepository.save(cart);
		logger.info("Product quantity decrease in Cart.");
		return updatedCart;
	}

	@Override
	public Cart removeProduct(Long productId, Long userId) {
		Product product = productService.getProduct(productId);
		User user = userService.getUser(userId);
		
		Cart cart = getCartByUser(user.getId());
		CartItem cartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(),productId);
		cart.setTotalPrice(cart.getTotalPrice() - (product.getSellPrice() * cartItem.getQuantity()));
		cart.removeCartItem(cartItem);
		cartItemRepository.delete(cartItem);
		Cart updatedCart = cartRepository.save(cart);
		logger.info("Remove Product Form Cart.");
		return updatedCart;
	}

}
