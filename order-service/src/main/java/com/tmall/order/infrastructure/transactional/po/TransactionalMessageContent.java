package com.tmall.order.infrastructure.transactional.po;

import lombok.Data;

@Data
public class TransactionalMessageContent {

	private Long id;
	private Long messageId;
	private String content;
}