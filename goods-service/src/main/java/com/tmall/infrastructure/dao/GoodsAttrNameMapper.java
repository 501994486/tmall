package com.tmall.infrastructure.dao;

import com.tmall.domain.entity.valueobject.GoodsAttrName;

public interface GoodsAttrNameMapper {
    int deleteByPrimaryKey(Integer attrNameId);

    int insert(GoodsAttrName record);

    int insertSelective(GoodsAttrName record);

    GoodsAttrName selectByPrimaryKey(Integer attrNameId);

    int updateByPrimaryKeySelective(GoodsAttrName record);

    int updateByPrimaryKey(GoodsAttrName record);
}