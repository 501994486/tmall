package com.tmall.order.domain.repository;

import com.tmall.order.domain.entity.Order;

public interface OrderRepository {

	boolean addOrder(Order order);
}
