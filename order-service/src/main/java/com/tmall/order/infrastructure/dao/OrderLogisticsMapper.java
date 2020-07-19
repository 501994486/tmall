package com.tmall.order.infrastructure.dao;

import com.tmall.order.domain.entity.OrderLogistics;

public interface OrderLogisticsMapper {
    int deleteByPrimaryKey(Integer orderlogisticsId);

    int insert(OrderLogistics record);

    int insertSelective(OrderLogistics record);

    OrderLogistics selectByPrimaryKey(Integer orderlogisticsId);

    int updateByPrimaryKeySelective(OrderLogistics record);

    int updateByPrimaryKey(OrderLogistics record);
}