package com.tmall.infrastructure.dao;

import com.tmall.domain.entity.Goods;
import com.tmall.domain.entity.valueobject.GoodsSku;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface GoodsWebMapper {

    Goods selectGoodsSpuBySpuId(Long spuId);

    GoodsSku selectGoodsSkuBySkuId(Long skuId);

    /**
     * 更新商品spu的库存
     * @param params
     * @return
     */
    int updateGoodsSpuStock(Map<String,Object> params);

    /**
     * 更新商品sku的库存
     * @param params
     * @return
     */
    int updateGoodsSkuStock(Map<String,Object> params);

    /**
     * 获取所有热销商品
     * @return
     */
    List<Goods> selectAllHotGoods();
}