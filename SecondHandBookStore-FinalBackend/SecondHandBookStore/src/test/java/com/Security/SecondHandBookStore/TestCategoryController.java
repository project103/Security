package com.Security.SecondHandBookStore;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;

import com.Security.SecondHandBookStore.entity.Category;
import com.Security.SecondHandBookStore.service.CategoryService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.Security.SecondHandBookStore.controller.CategoryController;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class TestCategoryController {
	
	@Mock
	private CategoryService categoryService;
	
	@InjectMocks
	private CategoryController categoryController;
	
	@Test
	public void testGetAllCategories() {
		
		Category category1 = Category.builder()
				.id(1L)
				.name("Adventure")
				.build();
		
		Category category2 = Category.builder()
				.id(1L)
				.name("Love")
				.build();
		
		List<Category> expectedCategories = Arrays.asList(category1,category2);
		
		when(categoryService.getCategories()).thenReturn(expectedCategories);
		
		List<Category> responseCategories = categoryController.getCategories();
		
		assertEquals(expectedCategories, responseCategories);
		
	}
	
	@Test
	public void testGetCategory() {
		Long categoryId = 1L;
		Category expectedCategory = Category.builder()
				.id(categoryId)
				.name("Adventure")
				.build();
		
		when(categoryService.getCategory(categoryId)).thenReturn(expectedCategory);
		
		Category responseCategory = categoryController.getCategory(categoryId);
		
		assertEquals(expectedCategory, responseCategory);
	}
	
	@Test
	public void testCreateCategory() {
		Long categoryId = 1L;
		
		Category category = Category.builder()
				.name("Adventure")
				.build();
		
		Category createdCategory = Category.builder()
				.id(categoryId)
				.name("Adventure")
				.build();
		
		when(categoryService.createCategory(category)).thenReturn(createdCategory);
		
		Category responseCategory = categoryController.createCategory(category);
		
		assertEquals(createdCategory, responseCategory);
	}
	
	@Test
	public void testUpdateCategory() {
		Long categoryId = 1L;
		
		Category category = Category.builder()
				.name("Adventure 2")
				.build();
		
		Category expectedCategory = Category.builder()
				.id(categoryId)
				.name("Adventure 2")
				.build();
		
		when(categoryService.updateCategory(categoryId,category)).thenReturn(expectedCategory);
		
		Category responseCategory = categoryController.updateCategory(categoryId,category);
		
		assertEquals(expectedCategory, responseCategory);
	}
	
	
	 @Test
	 public void testDeleteCategory() {
	        // Arrange
	        Long categoryId = 1L;
	        
	        when(categoryService.deleteCategory(categoryId)).thenReturn("Category 1 is Deleted");
	        
	        // Act
	        String response = categoryController.deleteCategory(categoryId);
	        
	        // Assert
	        verify(categoryService).deleteCategory(categoryId);
	        
	        assertEquals("Category 1 is Deleted",response);
	    }
}
