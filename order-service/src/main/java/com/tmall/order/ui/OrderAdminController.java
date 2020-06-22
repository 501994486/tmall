package com.tmall.order.ui;

import com.tmall.order.infrastructure.feign.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderAdminController {

	@Autowired
	private GoodsService goodsService;

	@GetMapping(value = "/hi")
	public String sayHi(@RequestParam String name) {
		return goodsService.tryToConnectGoodService(name);
	}
}
