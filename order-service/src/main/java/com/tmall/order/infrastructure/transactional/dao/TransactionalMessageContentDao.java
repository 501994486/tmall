package com.tmall.order.infrastructure.transactional.dao;

import com.tmall.order.infrastructure.transactional.po.TransactionalMessageContent;

import java.util.List;

public interface TransactionalMessageContentDao {

	void insert(TransactionalMessageContent record);

	List<TransactionalMessageContent> queryByMessageIds(String messageIds);
}
