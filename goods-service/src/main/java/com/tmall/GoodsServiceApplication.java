package com.tmall;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication()
@MapperScan("com.tmall.infrastructure.dao")
@EnableTransactionManagement
public class GoodsServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GoodsServiceApplication.class, args);
	}

}
