package com.Security.SecondHandBookStore.controller;

import java.util.List;

import com.Security.SecondHandBookStore.entity.Product;
import com.Security.SecondHandBookStore.responseAndRequest.ProductRequest;
import com.Security.SecondHandBookStore.service.ProductService;
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

import jakarta.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping(path="/api/v1/")
public class ProductController {
	
	
	@Autowired
	private ProductService productService;
	
	Logger logger = LoggerFactory.getLogger(ProductController.class);
	
	@GetMapping(path = "/books")
	public List<Product> getProducts(){
		logger.info("get all the books");
		return productService.getProducts();
	}
	
	@GetMapping(path ="/books-by-category-id/{id}")
	public List<Product> getProductsByCategory(@PathVariable Long id){
		logger.info("get all the books by category Id");
		return productService.getProductsByCategoryId(id);
	}
	
	@GetMapping(path = "/book/{id}")
	public Product getProduct(@PathVariable Long id) {
		logger.info("get the book by id:" + id);
		return productService.getProduct(id);
	}
	
	@PostMapping(path = "/book/create")
	public Product createProduct(@Valid @RequestBody ProductRequest product) {
		logger.info("create new Book");
		return productService.createProduct(product);
	}
	
	@PutMapping(path = "/book/update/{id}")
	public Product updateProduct(@PathVariable Long id,@Valid @RequestBody ProductRequest product) {
		logger.info("update the existing book of id: " + id);
		return productService.updateProduct(id, product);
	}
	
	
	@DeleteMapping(path = "/book/delete/{id}")
	public String deleteProduct(@PathVariable Long id) {
		logger.info("Delete the Book By id:" + id);
		return productService.deleteProduct(id);
	}
	

}
