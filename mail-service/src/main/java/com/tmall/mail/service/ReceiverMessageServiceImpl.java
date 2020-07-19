package com.tmall.mail.service;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class ReceiverMessageServiceImpl {

	@RabbitListener(queues="topic.queue1")
	public  void process1(String mailType){

	}
}
