package com.tmall.order.infrastructure.feign;

import com.tmall.common.dto.GoodsStock;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "goods-service",fallback = GoodsServiceHystric.class)
public interface GoodsService {

	@RequestMapping(value = "/tmall/hi",method = RequestMethod.GET)
	String tryToConnectGoodService(@RequestParam(value = "name") String name);

	@RequestMapping(value = "/goods/stock",method = RequestMethod.GET)
	GoodsStock getGoodsStock(@RequestParam(value = "spuId") long spuId);

	@RequestMapping(value = "/goods/stock",method = RequestMethod.POST)
	boolean updateGoodsStock(@RequestParam(value = "spuId") long spuId,@RequestParam(value = "goodsStock") int goodsStock);
}
