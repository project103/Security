package com.Security.SecondHandBookStore.responseAndRequest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequest {

    private String name;
    
    private String author;
    
    private String image;

    private String description;

    private int price;
    
    private int sellPrice;

    private int stock;
    
    private Long categoryId;

    private String tokenCheck;

}
