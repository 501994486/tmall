package com.tmall.order.infrastructure.dao;

import com.tmall.order.domain.entity.OrderInvoice;

public interface OrderInvoiceMapper {
    int deleteByPrimaryKey(Integer invoiceId);

    int insert(OrderInvoice record);

    int insertSelective(OrderInvoice record);

    OrderInvoice selectByPrimaryKey(Integer invoiceId);

    int updateByPrimaryKeySelective(OrderInvoice record);

    int updateByPrimaryKey(OrderInvoice record);
}