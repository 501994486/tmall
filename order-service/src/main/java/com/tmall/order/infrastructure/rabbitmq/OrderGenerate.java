package com.tmall.order.infrastructure.rabbitmq;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tmall.common.dto.GoodsStock;
import com.tmall.order.application.service.OrderService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OrderGenerate {
	@Autowired
	private OrderService orderService;

	@Autowired
	private ObjectMapper jacksonObjectMapper;


	@RabbitListener(queues="orderQueue")    //监听器监听指定的Queue
	public void process(String jsonValue) throws IOException {

		GoodsStock goodsStock = jacksonObjectMapper.readValue(jsonValue,GoodsStock.class);
		orderService.createOrderByMq(goodsStock.getSpuId(),goodsStock.getGoodsStock(),goodsStock.getUserId());
	}
}
