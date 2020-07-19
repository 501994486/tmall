package com.tmall.order.infrastructure.dao;

import com.tmall.order.domain.entity.OrderReturns;

public interface OrderReturnsMapper {
    int deleteByPrimaryKey(Integer orderReturnsId);

    int insert(OrderReturns record);

    int insertSelective(OrderReturns record);

    OrderReturns selectByPrimaryKey(Integer orderReturnsId);

    int updateByPrimaryKeySelective(OrderReturns record);

    int updateByPrimaryKey(OrderReturns record);
}