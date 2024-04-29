package com.Security.SecondHandBookStore.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Security.SecondHandBookStore.entity.Category;
import com.Security.SecondHandBookStore.exception.CategoryNotFoundException;
import com.Security.SecondHandBookStore.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {
	
	
	@Autowired
	CategoryRepository categoryRepository;
	
	
	Logger logger = LoggerFactory.getLogger(CategoryServiceImpl.class);

	@Override
	public Category getCategory(Long id) {
		Category category = categoryRepository.findById(id)
			.orElseThrow(() -> new CategoryNotFoundException("Category Not Found of Id : " + id));
		logger.info("get the category by ID");
		return category;
	}

	@Override
	public List<Category> getCategories() {
		List<Category> categories = categoryRepository.findAll();
		logger.info("get all the categories");
		return categories;
	}

	@Override
	public Category createCategory(Category category) {
		Category save = categoryRepository.save(category);
		logger.info("create the new category");
		return save;
	}

	@Override
	public Category updateCategory(Long id, Category category) {
		Category existingCategory = getCategory(id);
        existingCategory.setName(category.getName());
        Category save = categoryRepository.save(existingCategory);
        logger.info("update the category");
		return save;
	}

	@Override
	public String deleteCategory(Long id) {
		Category category = getCategory(id);
		categoryRepository.delete(category);
		logger.info("delete the category");
		return String.format("Category %d is Deleted", id);
	}

}
