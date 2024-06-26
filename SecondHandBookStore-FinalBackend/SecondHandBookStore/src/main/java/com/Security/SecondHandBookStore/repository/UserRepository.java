package com.Security.SecondHandBookStore.repository;

import com.Security.SecondHandBookStore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	public User findByEmail(String email);

	
	public User findByEmailAndPassword(String email,String password);


}
