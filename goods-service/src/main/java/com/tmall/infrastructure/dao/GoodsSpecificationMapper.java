package com.tmall.infrastructure.dao;

import com.tmall.domain.entity.GoodsSpecification;

public interface GoodsSpecificationMapper {
    int deleteByPrimaryKey(Integer itemId);

    int insert(GoodsSpecification record);

    int insertSelective(GoodsSpecification record);

    GoodsSpecification selectByPrimaryKey(Integer itemId);

    int updateByPrimaryKeySelective(GoodsSpecification record);

    int updateByPrimaryKey(GoodsSpecification record);
}