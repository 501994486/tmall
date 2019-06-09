package com.tmall.infrastructure.dao;

import com.tmall.domain.entity.GoodsAttr;

public interface GoodsAttrMapper {
    int deleteByPrimaryKey(Long attrId);

    int insert(GoodsAttr record);

    int insertSelective(GoodsAttr record);

    GoodsAttr selectByPrimaryKey(Long attrId);

    int updateByPrimaryKeySelective(GoodsAttr record);

    int updateByPrimaryKey(GoodsAttr record);
}