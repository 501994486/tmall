package com.tmall.order.ui;

import com.tmall.order.application.service.GoodsStockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class StockController {

	@Autowired
	private GoodsStockService goodsStockService;

	/**
	 * 查询库存：通过数据库查询库存
	 * @param spuId
	 * @return
	 */
	@GetMapping("/order/way1/{spuId}")
	public Integer getStockByDB(@PathVariable int spuId) {
		int count = goodsStockService.getGoodsSpuStock(spuId);
		return count;
	}

	/**
	 * 查询库存方式1：通过缓存查询库存
	 * @param spuId
	 * @return
	 */
	@GetMapping("/order/way2/{spuId}")
	public Integer getStockByCache(@PathVariable int spuId) {
		Integer count = goodsStockService.getStockCountByCache(spuId);
		return count;
	}
}
