package com.tmall.order.application.service;


import com.tmall.order.domain.entity.Stock;

public interface GoodsStockService {

    int getGoodsSpuStock(int spuId);

    /**
     * 查询库存：通过缓存查询库存
     * 缓存命中：返回库存
     * 缓存未命中：查询数据库写入缓存并返回
     * @param id
     * @return
     */
    Integer getStockCount(int id);

    /**
     * 获取剩余库存: 查缓存
     * @param id
     * @return
     */
    Integer getStockCountByCache(int id);

    /**
     * 更新数据库库存信息（乐观锁）
     * @param spuId
     * @param goodsStock
     * @return
     */
    boolean updateStockByOptimistic(long spuId,int goodsStock);

}
