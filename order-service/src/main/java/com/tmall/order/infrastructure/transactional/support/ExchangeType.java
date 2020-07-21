package com.tmall.order.infrastructure.transactional.support;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExchangeType {

	FANOUT("fanout"),

	DIRECT("direct"),

	TOPIC("topic"),

	DEFAULT(""),

	;

	private final String type;
}
