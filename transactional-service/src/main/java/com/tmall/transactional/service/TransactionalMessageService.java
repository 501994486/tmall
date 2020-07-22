package com.tmall.transactional.service;

import com.tmall.transactional.support.Destination;
import com.tmall.transactional.support.TxMessage;


// 对外提供的服务类接口
public interface TransactionalMessageService {

	void sendTransactionalMessage(Destination destination, TxMessage message);
}

