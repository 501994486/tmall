package com.tmall.infrastructure.amqp;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
public class AmqpConfig {
	public static final String EXCHANGE   = "mail";
	public static final String ROUTINGKEY = "spring-boot-routingKey";

	@Bean
	public ConnectionFactory connectionFactory() {
		CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
		connectionFactory.setAddresses("192.168.6.130:5672");
		connectionFactory.setUsername("guest");
		connectionFactory.setPassword("guest");
		connectionFactory.setVirtualHost("tmall");
		connectionFactory.setPublisherConfirms(true); //手动确认模式时设置
		return connectionFactory;
	}

	@Bean
	/** 手动确认模式时
	 * 因为要设置回调类，所以应是prototype类型，
	 * 如果是singleton类型，则回调类为最后一次设置 */
	@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
	public RabbitTemplate rabbitTemplate() {
		RabbitTemplate template = new RabbitTemplate(connectionFactory());
		return template;
	}

	/**
	 * 针对消费者配置
	 * 1. 设置交换机类型
	 * 2. 将队列绑定到交换机
	 FanoutExchange: 将消息分发到所有的绑定队列，无routingkey的概念
	 HeadersExchange ：通过添加属性key-value匹配
	 DirectExchange:按照routingkey分发到指定队列
	 TopicExchange:多关键字匹配
	 */
	@Bean
	public DirectExchange defaultExchange() {
		boolean durable = true;
		boolean autoDelete = false;
		return new DirectExchange(EXCHANGE, durable, autoDelete);
	}

	@Bean
	public Queue queueA() {
		boolean durable = true;
		boolean exclusive = false;
		boolean autoDelete = false;
		return new Queue("spring-boot-queueA",durable, exclusive, autoDelete);
	}

	@Bean
	public Binding binding() {  //此处也可以传入队列和交换机参数
		return BindingBuilder.bind(queueA()).to(defaultExchange()).with(AmqpConfig.ROUTINGKEY);
	}

}