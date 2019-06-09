package com.tmall.infrastructure.dao;

import com.tmall.domain.entity.GoodsAttrValue;

public interface GoodsAttrValueMapper {
    int deleteByPrimaryKey(Integer attrValueId);

    int insert(GoodsAttrValue record);

    int insertSelective(GoodsAttrValue record);

    GoodsAttrValue selectByPrimaryKey(Integer attrValueId);

    int updateByPrimaryKeySelective(GoodsAttrValue record);

    int updateByPrimaryKey(GoodsAttrValue record);
}