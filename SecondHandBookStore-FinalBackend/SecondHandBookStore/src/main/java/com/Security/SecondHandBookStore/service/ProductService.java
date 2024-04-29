package com.Security.SecondHandBookStore.service;

import java.util.List;

import com.Security.SecondHandBookStore.entity.Product;
import com.Security.SecondHandBookStore.responseAndRequest.ProductRequest;

public interface ProductService {
	
	Product getProduct(Long id);
	
	List<Product> getProducts();
	
	List<Product> getProductsByCategoryId(Long categoryId);
	
	Product createProduct(ProductRequest product);
	
	Product updateProduct(Long id,ProductRequest product);
	
	String deleteProduct(Long id);
	
	

}
