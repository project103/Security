package com.Security.SecondHandBookStore.controller;

import java.util.List;

import com.Security.SecondHandBookStore.entity.Product;
import com.Security.SecondHandBookStore.entity.User;
import com.Security.SecondHandBookStore.repository.UserRepository;
import com.Security.SecondHandBookStore.responseAndRequest.ProductRequest;
import com.Security.SecondHandBookStore.service.JwtService;
import com.Security.SecondHandBookStore.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping(path="/api/v1/")
public class ProductController {


	@Autowired
	private ProductService productService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository repository;

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

	@PostMapping(path = "/book/create", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE})
	public Product createProduct(@Valid @RequestBody ProductRequest product) {
		logger.info("create new Book");
		return productService.createProduct(product);
	}

	@PutMapping(path = "/book/update/{id}/{userId}")
	public Product updateProduct(@PathVariable Long id, @PathVariable Long userId, @Valid @RequestBody ProductRequest product,
                                 @RequestHeader("Authorization") String authToken) {
        User user = repository.getById(userId);
if(jwtService.isValid(authToken , user) && user.getRole().matches("ADMIN")) {
    return productService.updateProduct(id, product);
    }
        Product Error = new Product();
        Error.setTokenCheck("unknown");
    return Error;
	}


	@DeleteMapping(path = "/book/delete/{id}")
	public String deleteProduct(@PathVariable Long id) {
		logger.info("Delete the Book By id:" + id);
		return productService.deleteProduct(id);
	}


}
