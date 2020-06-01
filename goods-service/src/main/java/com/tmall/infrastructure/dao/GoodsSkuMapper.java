package com.tmall.infrastructure.dao;

import com.tmall.domain.entity.valueobject.GoodsSku;

public interface GoodsSkuMapper {
    int deleteByPrimaryKey(Long skuId);

    int insert(GoodsSku record);

    int insertSelective(GoodsSku record);

    GoodsSku selectByPrimaryKey(Long skuId);

    int updateByPrimaryKeySelective(GoodsSku record);

    int updateByPrimaryKey(GoodsSku record);

    GoodsSku selectGoodsSkuSpecBySkuId(Long skuId);
}