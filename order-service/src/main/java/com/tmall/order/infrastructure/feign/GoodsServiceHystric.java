package com.tmall.order.infrastructure.feign;

import org.springframework.stereotype.Component;

@Component
public class GoodsServiceHystric implements GoodsService{

	public String tryToConnectGoodService(String name){
		return "sorry "+name;
	}
}
