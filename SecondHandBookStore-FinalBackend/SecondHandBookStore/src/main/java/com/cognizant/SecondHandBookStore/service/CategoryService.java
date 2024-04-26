package com.cognizant.SecondHandBookStore.service;

import java.util.List;

import com.cognizant.SecondHandBookStore.entity.Category;

public interface CategoryService {
	
	List<Category> getCategories();
	
	Category getCategory(Long id);
	
	Category createCategory(Category category);
	
	Category updateCategory(Long id,Category category);
	
	String deleteCategory(Long id);

}
