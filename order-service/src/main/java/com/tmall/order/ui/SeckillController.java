package com.tmall.order.ui;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tmall.common.AppConstants;
import com.tmall.common.CommonLogic;
import com.tmall.common.dto.GoodsStock;
import com.tmall.order.application.service.OrderService;
import com.tmall.order.application.service.GoodsStockService;
import com.tmall.order.domain.entity.Order;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


@RestController
public class SeckillController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private GoodsStockService goodsStockService;

	@Autowired
	private HttpSession session;

	@Autowired
	private AmqpTemplate rabbitTemplate;

	@Autowired
	private ObjectMapper jacksonObjectMapper;

	/**
	 * 下单方式接口1：乐观锁更新库存
	 * @param spuId
	 * @param stock
	 * @return
	 */
	@PostMapping("/order/way1/{spuId}/{stock}")
	public String createOptimisticOrder(@PathVariable int spuId,@PathVariable int stock) {

		// 校验库存
		int goodsSpuStock = goodsStockService.getGoodsSpuStock(spuId);
		if(goodsSpuStock == AppConstants.ERROR_CODE){
			return AppConstants.ERROR_RESULT;
		}

		//乐观锁更新库存
		if(!goodsStockService.updateStockByOptimistic(spuId,stock)){
			return AppConstants.ERROR_RESULT;
		}

		//创建订单
		Order order = new Order();
		if(!orderService .createOrder(order)){
			return AppConstants.ERROR_RESULT;
		}

		return AppConstants.SUCCESS_RESULT;
	}

	/**
	 * 下单方式接口2：异步处理订单
	 * @param spuId
	 * @param stock
	 * @return
	 */
	@PostMapping("/order/way2/{spuId}/{stock}")
	public String createOrderWithMq(@PathVariable int spuId,@PathVariable int stock) throws JsonProcessingException {

		// 检查缓存中商品是否还有库存
		Integer count = goodsStockService.getStockCount(spuId);
		if (count - stock < 0) {
			return AppConstants.ERROR_RESULT;
		}

		// 有库存，则将用户id和商品id封装为消息体传给消息队列处理
		// 注意这里的有库存和已经下单都是缓存中数据，存在不可靠性，在消息队列中会查表再次验证
		GoodsStock goodsStock = new GoodsStock();
		goodsStock.setSpuId(spuId);
		goodsStock.setGoodsStock(stock);
		goodsStock.setUserId(CommonLogic.getUserId(session));
		this.rabbitTemplate.convertAndSend("orderQueue", jacksonObjectMapper.writeValueAsString(goodsStock));
		return AppConstants.SUCCESS_RESULT;
	}

	/**
	 * 下单方式接口3：异步处理订单(限购1)
	 * @param spuId
	 * @param stock
	 * @return
	 */
	@PostMapping("/order/way2/{spuId}/{stock}")
	public String createUserOrderWithMq(@PathVariable int spuId,@PathVariable int stock) throws JsonProcessingException {

		// 检查缓存中该用户是否已经下单过
		Boolean hasOrder = orderService.checkUserOrderInfoInCache(spuId,CommonLogic.getUserId(session));
		if (hasOrder != null && hasOrder) {
			return AppConstants.ERROR_REPEAT;
		}

		// 检查缓存中商品是否还有库存
		Integer count = goodsStockService.getStockCount(spuId);
		if (count - stock < 0) {
			return AppConstants.ERROR_RESULT;
		}

		GoodsStock goodsStock = new GoodsStock();
		goodsStock.setSpuId(spuId);
		goodsStock.setGoodsStock(stock);
		goodsStock.setUserId(CommonLogic.getUserId(session));
		this.rabbitTemplate.convertAndSend("exchange","orderQueue", jacksonObjectMapper.writeValueAsString(goodsStock));
		return AppConstants.SUCCESS_RESULT;
	}

	/**
	 * 检查缓存中用户是否已经生成订单
	 * @param spuId
	 * @param userId
	 * @return
	 */
	@RequestMapping(value = "/order/{spuId}", method = {RequestMethod.GET})
	public String checkOrderByUserIdInCache(@PathVariable int spuId,@RequestParam(value = "userId") Integer userId) {
		// 检查缓存中该用户是否已经下单过

		Boolean hasOrder = orderService.checkUserOrderInfoInCache(spuId, userId);
		if (hasOrder != null && hasOrder) {
			return AppConstants.SUCCESS_RESULT;
		}

		return AppConstants.ERROR_RESULT;
	}

}
