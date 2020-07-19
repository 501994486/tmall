package com.tmall.order.infrastructure.dao;

import com.tmall.order.domain.entity.DeliveryAddress;

public interface DeliveryAddressMapper {
    int deleteByPrimaryKey(Integer addressId);

    int insert(DeliveryAddress record);

    int insertSelective(DeliveryAddress record);

    DeliveryAddress selectByPrimaryKey(Integer addressId);

    int updateByPrimaryKeySelective(DeliveryAddress record);

    int updateByPrimaryKey(DeliveryAddress record);
}