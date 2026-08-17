package com.shrishyam.properties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ShriShyamPropertiesApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShriShyamPropertiesApplication.class, args);
		System.out.println("==================================================");
		System.out.println("Shri Shyam Properties Spring Boot Backend Running!");
		System.out.println("Target Area: Dwarka, New Delhi");
		System.out.println("==================================================");
	}

}
