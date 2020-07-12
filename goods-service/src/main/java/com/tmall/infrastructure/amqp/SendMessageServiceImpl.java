package com.tmall.infrastructure.amqp;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.support.CorrelationData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class SendMessageServiceImpl  implements RabbitTemplate.ConfirmCallback{

	@Autowired
	private RabbitTemplate rabbitTemplate;

	public void send(String content) {
		rabbitTemplate.setConfirmCallback(this);
		System.out.println("生产者发送内容 : " + content);
		CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString());

		System.out.println("消息id:" + correlationData.getId());

		rabbitTemplate.convertAndSend("spring-boot-exchange",  "spring-boot-routingKey", content,correlationData);
	}


	public void confirm(CorrelationData correlationData, boolean ack, String cause) {
		System.out.println("消息id:" + correlationData.getId());
		if (ack) {
			System.out.println("消息发送确认成功");
		} else {
			System.out.println("消息发送确认失败:" + cause);
		}
	}

}