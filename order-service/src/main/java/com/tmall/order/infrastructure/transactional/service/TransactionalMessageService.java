package com.tmall.order.infrastructure.transactional.service;

import com.tmall.order.infrastructure.transactional.support.Destination;
import com.tmall.order.infrastructure.transactional.support.TxMessage;



// 对外提供的服务类接口
public interface TransactionalMessageService {

	void sendTransactionalMessage(Destination destination, TxMessage message);
}

