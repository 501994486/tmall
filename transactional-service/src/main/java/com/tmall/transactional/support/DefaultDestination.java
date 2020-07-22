package com.tmall.transactional.support;

import lombok.Builder;

@Builder
public class DefaultDestination implements Destination {

	private ExchangeType exchangeType;
	private String queueName;
	private String exchangeName;
	private String routingKey;

	@Override
	public ExchangeType exchangeType() {
		return exchangeType;
	}

	@Override
	public String queueName() {
		return queueName;
	}

	@Override
	public String exchangeName() {
		return exchangeName;
	}

	@Override
	public String routingKey() {
		return routingKey;
	}
}
