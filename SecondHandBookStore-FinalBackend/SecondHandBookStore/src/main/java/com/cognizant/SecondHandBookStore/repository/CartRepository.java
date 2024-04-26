package com.cognizant.SecondHandBookStore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.SecondHandBookStore.entity.Cart;

@Repository
public interface CartRepository  extends JpaRepository<Cart, Long>{
	
	public Cart findByUserId(Long id);
	
}
