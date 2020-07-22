package com.tmall.transactional.dao;

import com.tmall.transactional.po.TransactionalMessageContent;

import java.util.List;

public interface TransactionalMessageContentMapper {

	void insert(TransactionalMessageContent record);

	List<TransactionalMessageContent> queryByMessageIds(String messageIds);
}
