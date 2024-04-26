package com.cognizant.SecondHandBookStore.responseAndRequest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartRequest {
	
	private Long userId;
	
	private Long productId;
	
	private int quantity;
	
}
