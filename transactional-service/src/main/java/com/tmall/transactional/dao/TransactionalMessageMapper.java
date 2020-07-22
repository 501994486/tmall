package com.tmall.transactional.dao;

import com.tmall.transactional.po.TransactionalMessage;

import java.time.LocalDateTime;
import java.util.List;

public interface TransactionalMessageMapper {

	void insertSelective(TransactionalMessage record);

	void updateStatusSelective(TransactionalMessage record);

	List<TransactionalMessage> queryPendingCompensationRecords(LocalDateTime minScheduleTime,
															   LocalDateTime maxScheduleTime,
															   int limit);
}