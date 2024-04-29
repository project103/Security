package com.Security.SecondHandBookStore.repository;

import com.Security.SecondHandBookStore.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository  extends JpaRepository<Cart, Long>{
	
	public Cart findByUserId(Long id);
	
}
