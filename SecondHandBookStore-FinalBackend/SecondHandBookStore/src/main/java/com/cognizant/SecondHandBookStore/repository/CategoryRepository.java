package com.cognizant.SecondHandBookStore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.SecondHandBookStore.entity.Category;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

}
