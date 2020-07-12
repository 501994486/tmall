package com.tmall.mail.amqp;

import org.springframework.amqp.core.AcknowledgeMode;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.ChannelAwareMessageListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
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
		connectionFactory.setPublisherConfirms(true); //必须要设置
		return connectionFactory;
	}

	@Bean
	/** 因为要设置回调类，所以应是prototype类型，如果是singleton类型，则回调类为最后一次设置 */
	@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
	public RabbitTemplate rabbitTemplate() {
		RabbitTemplate template = new RabbitTemplate(connectionFactory());
		return template;
	}
	/**
	 * 针对消费者配置
	 * 1. 设置交换机类型
	 * 2. 将队列绑定到交换机
	 *
	 *
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

	@Bean
	public SimpleMessageListenerContainer messageContainer() {
		SimpleMessageListenerContainer container = new SimpleMessageListenerContainer(connectionFactory());
		container.setQueues(queueA());
		container.setExposeListenerChannel(true);
		container.setMaxConcurrentConsumers(1);
		container.setConcurrentConsumers(1);
		container.setAcknowledgeMode(AcknowledgeMode.MANUAL);
		container.setMessageListener(new ChannelAwareMessageListener() {

			public void onMessage(Message message, com.rabbitmq.client.Channel channel) throws Exception {
				try {
					System.out.println(
							"消费端接收到消息:" + message.getMessageProperties() + ":" + new String(message.getBody()));
					System.out.println("topic:"+message.getMessageProperties().getReceivedRoutingKey());
					// deliveryTag是消息传送的次数，我这里是为了让消息队列的第一个消息到达的时候抛出异常，处理异常让消息重新回到队列，然后再次抛出异常，处理异常拒绝让消息重回队列
					/*if (message.getMessageProperties().getDeliveryTag() == 1
							|| message.getMessageProperties().getDeliveryTag() == 2) {
						throw new Exception();
					}*/

					channel.basicAck(message.getMessageProperties().getDeliveryTag(), false); // false只确认当前一个消息收到，true确认所有consumer获得的消息
				} catch (Exception e) {
					e.printStackTrace();

					if (message.getMessageProperties().getRedelivered()) {
						System.out.println("消息已重复处理失败,拒绝再次接收...");
						channel.basicReject(message.getMessageProperties().getDeliveryTag(), true); // 拒绝消息
					} else {
						System.out.println("消息即将再次返回队列处理...");
						channel.basicNack(message.getMessageProperties().getDeliveryTag(), false, true); // requeue为是否重新回到队列
					}
				}
			}
		});
		return container;
	}
}
