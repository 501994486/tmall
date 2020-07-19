package com.tmall.order.application.service;

import com.tmall.order.domain.entity.Order;

public interface OrderService {

    boolean createOrder(Order order);

    /**
     * 创建正确订单：验证库存 + 下单乐观锁 + 更新订单信息到缓存
     * @param spuId
     * @param goodsStock
     * @param userId
     */
    void createOrderByMq(long spuId, int goodsStock,Integer userId);

    /**
     * 检查缓存中用户是否已经有订单
     * @param sid
     * @param userId
     * @return
     * @throws Exception
     */
    Boolean checkUserOrderInfoInCache(Integer sid, Integer userId);

}
