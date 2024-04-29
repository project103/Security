package com.Security.SecondHandBookStore.controller;

import java.util.List;

import com.Security.SecondHandBookStore.entity.Category;
import com.Security.SecondHandBookStore.service.CategoryService;
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
@RequestMapping(path = "/api/v1/")
@CrossOrigin
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	Logger logger = LoggerFactory.getLogger(CategoryController.class);
	
	
	@GetMapping(path = "/book-categories")
	public List<Category> getCategories(){
		logger.info("Displaying All Books Categories.");
		return categoryService.getCategories();
	}
	
	
	@GetMapping(path = "/book-category/{id}")
	public Category getCategory(@PathVariable Long id) {
		logger.info("Displaying Book Category by ID : "+ id);
		return categoryService.getCategory(id);
	}
	
	
	@PostMapping(path = "/book-category/create")
	public Category createCategory(@Valid @RequestBody Category category) {
		logger.info("New Book Category is Creating");
		return categoryService.createCategory(category);
	}
	
	
	@PutMapping(path = "/book-category/update/{id}")
	public Category updateCategory(@PathVariable Long id,@Valid @RequestBody Category category) {
		logger.info("Book Category is updating of Id: " + id);
		return categoryService.updateCategory(id, category);
	}
	
	@DeleteMapping(path = "/book-category/delete/{id}")
	public String deleteCategory(@PathVariable Long id) {
		logger.info("Deleting the Book Category of Id: " + id);
		return categoryService.deleteCategory(id);
	}
	

}
