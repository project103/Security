package com.Security.SecondHandBookStore;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import com.Security.SecondHandBookStore.entity.Category;
import com.Security.SecondHandBookStore.entity.Product;
import com.Security.SecondHandBookStore.service.ProductService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.Security.SecondHandBookStore.controller.ProductController;
import com.Security.SecondHandBookStore.responseAndRequest.ProductRequest;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class TestProductController {
	
	@Mock
	private ProductService productService;

	@InjectMocks
	private ProductController productController;
	
	
	@Test
	public void testGetAllProducts() {
		
		Category category1 = Category.builder()
				.id(1L)
				.name("Adventure")
				.build();
		
		Product product1 = Product.builder()
				    .id(1L)
					.name("Fill The Love")
					.description("Hello World")
					.image("hello world")
					.price(200)
					.sellPrice(180)
					.stock(10)
					.category(category1)
					.build();
		
		Product product2 = Product.builder()
				.id(2L)
				.name("Fill The Love 2")
				.description("Hello World 2")
				.image("hello world 2")
				.price(220)
				.sellPrice(200)
				.stock(15)
				.category(category1)
				.build();
		
		List<Product> expectedProducts = Arrays.asList(product1,product2);
		
		when(productService.getProducts()).thenReturn(expectedProducts);
		
		List<Product> responseProducts = productController.getProducts();
		
		assertEquals(expectedProducts, responseProducts);
		
	}
	
	@Test
	public void testGetProduct() {
		Long productId = 1L;
		
		Category category1 = Category.builder()
				.id(1L)
				.name("Adventure")
				.build();
		
		Product expectedProduct = Product.builder()
				    .id(productId)
					.name("Fill The Love")
					.description("Hello World")
					.image("hello world")
					.price(200)
					.sellPrice(180)
					.stock(10)
					.category(category1)
					.build();
		
		
		when(productService.getProduct(productId)).thenReturn(expectedProduct);
		
		Product responseProduct = productController.getProduct(productId);
		
		assertEquals(expectedProduct, responseProduct);
		
	}
	
	
	@Test
	public void testCreateProduct() {
		Long productId = 1L;
		
		Category category1 = Category.builder()
				.id(1L)
				.name("Adventure")
				.build();
		
		Product expectedProduct = Product.builder()
					.id(productId)
					.name("Fill The Love")
					.description("Hello World")
					.image("hello world")
					.price(200)
					.sellPrice(180)
					.stock(10)
					.category(category1)
					.build();
		
		ProductRequest product = ProductRequest.builder()
				.name("Fill The Love")
				.description("Hello World")
				.image("hello world")
				.price(200)
				.sellPrice(180)
				.stock(10)
				.categoryId(1L)
				.build();
		
		
		when(productService.createProduct(product)).thenReturn(expectedProduct);
		
		Product responseProduct = productController.createProduct(product);
		
		assertEquals(expectedProduct, responseProduct);
		
	}
	
	@Test
	public void testDeleteProduct() {
		Long productId = 1L;
		// Mock the deleteProduct method
		when(productService.deleteProduct(productId)).thenReturn("Product is Deleted");

		// Call the deleteProduct method in the productController
		String isDeleted = productController.deleteProduct(productId);

		verify(productService).deleteProduct(productId);

	    assertEquals("Product is Deleted", isDeleted);
	    
	  }

}
