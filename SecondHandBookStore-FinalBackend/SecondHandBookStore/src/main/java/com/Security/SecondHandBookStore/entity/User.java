package com.Security.SecondHandBookStore.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
	
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	 	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	    private Long id;

	    @Column(nullable = false)
	    private String name;
	    
	    @Size(max = 12)
	    private String phoneNo;

	    @Column(nullable = false, unique = true)
	    private String email;

	    @JsonInclude(JsonInclude.Include.NON_NULL)
	    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	    private String password;
	    
	    private String address;
	    
	    @Builder.Default
	    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
	    private String role = "USER";
	    
	    @JsonIgnore
	    @OneToOne(optional = true,mappedBy = "user")
	    private Cart cart;
		
}
