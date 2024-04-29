package com.Security.SecondHandBookStore.repository;

import com.Security.SecondHandBookStore.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
	
	public CartItem findByProductId(Long id);
	
	public CartItem findByCartIdAndProductId(Long cartId,Long productId);
	
	public List<CartItem> findByCartId(Long cartId);

}
