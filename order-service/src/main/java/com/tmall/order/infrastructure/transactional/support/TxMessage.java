package com.tmall.order.infrastructure.transactional.support;

// 事务消息
public interface TxMessage {

	String businessModule();

	String businessKey();

	String content();
}