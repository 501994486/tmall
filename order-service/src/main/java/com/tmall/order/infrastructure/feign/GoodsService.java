package com.tmall.order.infrastructure.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "goods-service",fallback = GoodsServiceHystric.class)
public interface GoodsService {

	@RequestMapping(value = "/tmall/hi",method = RequestMethod.GET)
	String tryToConnectGoodService(@RequestParam(value = "name") String name);
}
