package com.app.deals;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.app.deals")
public class DealsApplication {

	public static void main(String[] args) {
		SpringApplication.run(DealsApplication.class, args);
	}
}
