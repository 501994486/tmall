package com.tmall.infrastructure.dao;

import com.tmall.domain.entity.valueobject.GoodsBasicSetup;

public interface GoodsBasicSetupMapper {

    int insert(GoodsBasicSetup record);

    int insertSelective(GoodsBasicSetup record);

    GoodsBasicSetup selectByPrimaryKey(Integer shopId);

    int updateByPrimaryKeySelective(GoodsBasicSetup record);

    int updateByPrimaryKeyWithBLOBs(GoodsBasicSetup record);

    int updateByPrimaryKey(GoodsBasicSetup record);
}