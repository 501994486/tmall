package com.tmall.infrastructure.dao;

import com.tmall.domain.entity.GoodsBasicSetup;

public interface GoodsBasicSetupMapper {
    int deleteByPrimaryKey(Integer baiscSetupId);

    int insert(GoodsBasicSetup record);

    int insertSelective(GoodsBasicSetup record);

    GoodsBasicSetup selectByPrimaryKey(Integer baiscSetupId);

    int updateByPrimaryKeySelective(GoodsBasicSetup record);

    int updateByPrimaryKeyWithBLOBs(GoodsBasicSetup record);

    int updateByPrimaryKey(GoodsBasicSetup record);
}