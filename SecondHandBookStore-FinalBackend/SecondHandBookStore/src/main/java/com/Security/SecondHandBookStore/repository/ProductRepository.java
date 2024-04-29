package com.Security.SecondHandBookStore.repository;

import java.util.List;

import com.Security.SecondHandBookStore.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	
	public List<Product> findByCategoryId(Long categoryId);
	
	public List<Product> findByCategoryName(String name);
	
	public List<Product> findByName(String name);

}
