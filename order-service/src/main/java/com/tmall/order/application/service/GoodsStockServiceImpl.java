package com.tmall.order.application.service;

import com.tmall.common.AppConstants;
import com.tmall.common.dto.GoodsStock;
import com.tmall.order.infrastructure.feign.GoodsService;
import com.tmall.order.infrastructure.redis.RedisKeyUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;

@Service
public class GoodsStockServiceImpl implements GoodsStockService {

   @Autowired
   private GoodsService goodsService;

    @Resource
    private ValueOperations<String,Integer> valueOperations;

    /**
     * 查询库存
     * @param spuId
     * @return
     */
    @Override
    public int getGoodsSpuStock(int spuId) {
        GoodsStock goodsStock = goodsService.getGoodsStock(spuId);
        if (goodsStock.getSpuSaleNum() == goodsStock.getGoodsStock()) {
            return AppConstants.ERROR_CODE;
        }
        return goodsStock.getGoodsStock();
    }

    @Override
    public Integer getStockCountByCache(int spuId) {
        String key = RedisKeyUtil.getKeyWithColumn("spu","spuId",String.valueOf(spuId),"stock");
        Integer stock = valueOperations.get(key);
        if (stock == null) {
            return AppConstants.ERROR_CODE;
        }

        return stock;
    }

    @Override
    public boolean updateStockByOptimistic(long spuId,int goodsStock) {
        return goodsService.updateGoodsStock(spuId,goodsStock);
    }

    @Override
    public Integer getStockCount(int sid) {
        Integer stock = getStockCountByCache(sid);

        if (stock == AppConstants.ERROR_CODE) {
            //缓存未命中，查询数据库，并写入缓存
        }
        return stock;
    }

}
