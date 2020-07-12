package com.tmall.eureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer   //标注该类用于启动Eureka服务器
public class EurekaServerApplication {

	public static void main(String[] args) {
		SpringApplication.run( EurekaServerApplication.class, args );
	}
}