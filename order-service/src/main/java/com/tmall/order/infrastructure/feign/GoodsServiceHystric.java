package com.tmall.order.infrastructure.feign;

import com.tmall.common.dto.GoodsStock;
import org.springframework.stereotype.Component;

@Component
public class GoodsServiceHystric implements GoodsService{

	public String tryToConnectGoodService(String name){
		return "sorry "+name;
	}

	@Override
	public GoodsStock getGoodsStock(long spuId) {
		return null;
	}

	@Override
	public boolean updateGoodsStock(long spuId, int goodsStock) {
		return false;
	}
}
