package com.tmall.order.infrastructure.transactional.support;

import lombok.RequiredArgsConstructor;

// 消息状态
@RequiredArgsConstructor
public enum TxMessageStatus {

	/**
	 * 成功
	 */
	SUCCESS(1),

	/**
	 * 待处理
	 */
	PENDING(0),

	/**
	 * 处理失败
	 */
	FAIL(-1),

	;

	private final Integer status;

	public Integer getStatus() {
		return status;
	}
}
