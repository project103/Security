package com.cognizant.SecondHandBookStore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.SecondHandBookStore.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	
	public List<Product> findByCategoryId(Long categoryId);
	
	public List<Product> findByCategoryName(String name);
	
	public List<Product> findByName(String name);

}
