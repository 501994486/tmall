package com.tmall.order.infrastructure.repositoryimpl;

import com.tmall.order.domain.entity.Order;
import com.tmall.order.domain.entity.OrderDetail;
import com.tmall.order.domain.repository.OrderRepository;
import com.tmall.order.infrastructure.dao.OrderDetailMapper;
import com.tmall.order.infrastructure.dao.OrderMapper;
import com.tmall.order.infrastructure.snowflake.SnowflakeIdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class OrderRepositoryImpl implements OrderRepository {

	@Autowired
	private SnowflakeIdWorker snowflakeIdWorker;

	@Autowired
	private OrderMapper orderMapper;

	@Autowired
	private OrderDetailMapper orderDetailMapper;

	/**
	 * 增加订单
	 * @param order
	 * @return
	 */
	@Override
	@Transactional
	public boolean addOrder(Order order){
		long orderId = snowflakeIdWorker.nextId();
		order.setOrderId(orderId);

		List<OrderDetail> orderDetailList = order.getOrderDetailList();

		if(orderMapper.insert(order) > 0
			&&orderDetailMapper.batchInsert(orderDetailList) > 0){
			return true;
		}

		return false;
	}
}
