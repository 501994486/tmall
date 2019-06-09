package com.tmall.infrastructure.dao;

import com.tmall.domain.entity.GoodsSKU;

public interface GoodsSKUMapper {
    int deleteByPrimaryKey(Long skuId);

    int insert(GoodsSKU record);

    int insertSelective(GoodsSKU record);

    GoodsSKU selectByPrimaryKey(Long skuId);

    int updateByPrimaryKeySelective(GoodsSKU record);

    int updateByPrimaryKey(GoodsSKU record);
}