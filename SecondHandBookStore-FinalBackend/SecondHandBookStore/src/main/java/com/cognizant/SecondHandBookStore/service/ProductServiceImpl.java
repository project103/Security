package com.cognizant.SecondHandBookStore.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.SecondHandBookStore.entity.Category;
import com.cognizant.SecondHandBookStore.entity.Product;
import com.cognizant.SecondHandBookStore.exception.ProductNotFoundException;
import com.cognizant.SecondHandBookStore.repository.CategoryRepository;
import com.cognizant.SecondHandBookStore.repository.ProductRepository;
import com.cognizant.SecondHandBookStore.responseAndRequest.ProductRequest;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private CategoryService categoryService;
	
	
	Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);
	

	@Override
	public Product getProduct(Long id) {
		Product product = productRepository.findById(id)
				.orElseThrow(() -> new ProductNotFoundException("Book Not Found of Id :" + id));
		logger.info("get the Book with id");
		return product;
	}
	
	
	@Override
	public List<Product> getProducts() {
		List<Product> products = productRepository.findAll();
		logger.info("get the all products");
		return products;
	}
	
	
	public List<Product> getProductsByCategoryId(Long categoryId) {
        List<Product> findByCategoryId = productRepository.findByCategoryId(categoryId);
        logger.info("get products with categtory id");
		return findByCategoryId;
    }


	@Override
	public Product createProduct(ProductRequest product) {
		Category category = categoryRepository.findById(product.getCategoryId()).get();
		Product productCreate  = new Product();
		productCreate.setName(product.getName());
		productCreate.setDescription(product.getDescription());
		productCreate.setAuthor(product.getAuthor());
		productCreate.setImage(product.getImage());
		productCreate.setSellPrice(product.getSellPrice());
		productCreate.setPrice(product.getPrice());
		productCreate.setStock(product.getStock());
		productCreate.setCategory(category);
		
		Product createdProduct = productRepository.save(productCreate);
		
		List<Product> products = new ArrayList<>();
		
		products.add(createdProduct);
		
		category.setProducts(products);
		
		logger.info("Product is created!");
		
		return createdProduct;
	}

	@Override
	public Product updateProduct(Long id, ProductRequest product) {
		Product existingProduct = getProduct(id);
		
		if(product.getName() != null) {
			existingProduct.setName(product.getName());			
		}
		
		if(product.getImage() != null) {
			existingProduct.setImage(product.getImage());			
		}
		
		if(product.getDescription() != null) {
			existingProduct.setDescription(product.getDescription());			
		}
		
		if(product.getAuthor() != null) {
			existingProduct.setAuthor(product.getAuthor());
		}
		
		if(product.getPrice() != 0) {
			existingProduct.setPrice(product.getPrice());		
		}
		
		if(product.getSellPrice() != 0) {
			existingProduct.setSellPrice(product.getSellPrice());						
		}
		
		if(product.getStock() != 0) {
			existingProduct.setStock(product.getStock());			
		}
		
		if(product.getCategoryId() != 0){
			Category category = categoryService.getCategory(product.getCategoryId());
			existingProduct.setCategory(category);
		}
		
        Product updatedProduct = productRepository.save(existingProduct);
        
        logger.info("Book is updated!");
        
		return updatedProduct;
	}

	@Override
	public String deleteProduct(Long id) {
		Product product = getProduct(id);
        productRepository.delete(product);
        logger.info("Product is Deleted!");
		return String.format("Product %s is Deleted", id);
	}
	
}
