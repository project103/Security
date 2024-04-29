package com.Security.SecondHandBookStore;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Arrays;

import com.Security.SecondHandBookStore.service.CartService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.Security.SecondHandBookStore.controller.CartController;
import com.Security.SecondHandBookStore.entity.Cart;
import com.Security.SecondHandBookStore.entity.CartItem;
import com.Security.SecondHandBookStore.entity.Category;
import com.Security.SecondHandBookStore.entity.Product;
import com.Security.SecondHandBookStore.entity.User;
import com.Security.SecondHandBookStore.responseAndRequest.CartRequest;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class TestCartController {
	
	@Mock
	private CartService cartService;

	@InjectMocks
	private CartController cartController;
	
	@Test
	public void testGetCart() {
		Long cartId = 1L;
		
		User user = User.builder()
				.id(1L)
				.name("Aditya Chandrikapure")
				.email("aditya@gmail.com")
				.phoneNo("1234567891")
				.address("Gondia, Maharashtra")
				.password("Aditya@123")
				.build();
		
		Cart expectedCart = Cart.builder()
				.id(1L)
				.user(user)
				.totalPrice(0)
				.build();
		
		when(cartService.getCart(cartId)).thenReturn(expectedCart);
		
		Cart responseCart = cartController.getCart(cartId);
		
		assertEquals(expectedCart, responseCart);
		
	}
	
	
	@Test
	public void testGetCartByUser() {
		Long userId = 1L;
		
		User user = User.builder()
				.id(1L)
				.name("Aditya Chandrikapure")
				.email("aditya@gmail.com")
				.phoneNo("1234567891")
				.address("Gondia, Maharashtra")
				.password("Aditya@123")
				.build();
		
		Cart expectedCart = Cart.builder()
				.id(1L)
				.user(user)
				.totalPrice(0)
				.build();
		
		when(cartService.getCartByUser(userId)).thenReturn(expectedCart);
		
		Cart responseCart = cartController.getCartByUserId(userId);
		
		assertEquals(expectedCart, responseCart);
		
	}
	
	@Test
	public void testAddCartItem() {
		
		User user = User.builder()
				.id(1L)
				.name("Aditya Chandrikapure")
				.email("aditya@gmail.com")
				.phoneNo("1234567891")
				.address("Gondia, Maharashtra")
				.password("Aditya@123")
				.build();
		
				
		Category category = Category.builder()
				.id(1L)
				.name("Adventure")
				.build();
		
		Product product = Product.builder()
			    .id(1L)
				.name("Fill The Love")
				.description("Hello World")
				.image("hello world")
				.price(200)
				.sellPrice(180)
				.stock(10)
				.category(category)
				.build();
		
		CartItem cartItem = CartItem.builder()
				.id(1L)
				.product(product)
				.quantity(1)
				.build();
		
		List<CartItem> cartItems = Arrays.asList(cartItem);
		
		Cart expectedCart = Cart.builder()
				.id(1L)
				.user(user)
				.cartItems(cartItems)
				.totalPrice(180)
				.build();
		
		CartRequest cartRequest = CartRequest.builder()
				.userId(1L)
				.productId(1L)
				.quantity(1)
				.build();
		
		System.out.println(expectedCart);
		
		when(cartService.addCartItem(cartRequest)).thenReturn(expectedCart);
		
		Cart responseCart = cartController.addCartItem(cartRequest);
		
		assertEquals(expectedCart, responseCart);
		
	}
	
	@Test
	public void testIncreaseQuantity() {
		Long userId = 1L;
		Long ProductId = 1L;
		
		User user = User.builder()
				.id(1L)
				.name("Aditya Chandrikapure")
				.email("aditya@gmail.com")
				.phoneNo("1234567891")
				.address("Gondia, Maharashtra")
				.password("Aditya@123")
				.build();
		
				
		Category category = Category.builder()
				.id(1L)
				.name("Adventure")
				.build();
		
		Product product = Product.builder()
			    .id(1L)
				.name("Fill The Love")
				.description("Hello World")
				.image("hello world")
				.price(200)
				.sellPrice(100)
				.stock(10)
				.category(category)
				.build();
		
		CartItem cartItem = CartItem.builder()
				.id(1L)
				.product(product)
				.quantity(2)
				.build();
		
		List<CartItem> cartItems = Arrays.asList(cartItem);
		
		Cart expectedCart = Cart.builder()
				.id(1L)
				.user(user)
				.cartItems(cartItems)
				.totalPrice(200)
				.build();
		
		System.out.println(expectedCart);
		
		when(cartService.increaseQuantity(ProductId,userId)).thenReturn(expectedCart);
		
		Cart responseCart = cartController.increaseQuantityOfProduct(ProductId,userId);
		
		assertEquals(expectedCart, responseCart);
		
	}
	
	@Test
	public void testDecreaseQuantity() {
		Long userId = 1L;
		Long ProductId = 1L;
		
		User user = User.builder()
				.id(1L)
				.name("Aditya Chandrikapure")
				.email("aditya@gmail.com")
				.phoneNo("1234567891")
				.address("Gondia, Maharashtra")
				.password("Aditya@123")
				.build();
		
				
		Category category = Category.builder()
				.id(1L)
				.name("Adventure")
				.build();
		
		Product product = Product.builder()
			    .id(1L)
				.name("Fill The Love")
				.description("Hello World")
				.image("hello world")
				.price(200)
				.sellPrice(100)
				.stock(10)
				.category(category)
				.build();
		
		CartItem cartItem = CartItem.builder()
				.id(1L)
				.product(product)
				.quantity(2)
				.build();
		
		List<CartItem> cartItems = Arrays.asList(cartItem);
		
		Cart expectedCart = Cart.builder()
				.id(1L)
				.user(user)
				.cartItems(cartItems)
				.totalPrice(200)
				.build();
		
		System.out.println(expectedCart);
		
		when(cartService.decreaseQuantity(ProductId,userId)).thenReturn(expectedCart);
		
		Cart responseCart = cartController.decreaseQuantityOfProduct(ProductId,userId);
		
		assertEquals(expectedCart, responseCart);
		
	}
	
	@Test
	public void testRemoveProduct() {
			Long cartId = 1L;
			Long productId = 1L;

			CartItem cartItem = CartItem.builder()
					.id(1L)
					.product(Product.builder()
							.id(productId)
							.build())
					.quantity(1)
					.build();

			Cart expectedCart = Cart.builder()
					.id(cartId)
					.cartItems(Arrays.asList(cartItem))
					.totalPrice(18)
					.build();

			when(cartService.removeProduct(cartId, productId)).thenReturn(expectedCart);


			Cart responseCart = cartController.removeBook(productId, 1L);

			assertEquals(expectedCart, responseCart);

			verify(cartService).removeProduct(cartId, productId);
			
	}

}
