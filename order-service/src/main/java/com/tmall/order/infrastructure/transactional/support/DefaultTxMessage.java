package com.tmall.order.infrastructure.transactional.support;

import lombok.Builder;

@Builder
public class DefaultTxMessage implements TxMessage {

	private String businessModule;
	private String businessKey;
	private String content;

	@Override
	public String businessModule() {
		return businessModule;
	}

	@Override
	public String businessKey() {
		return businessKey;
	}

	@Override
	public String content() {
		return content;
	}
}