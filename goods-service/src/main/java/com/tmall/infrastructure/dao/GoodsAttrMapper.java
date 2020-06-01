package com.tmall.infrastructure.dao;

import com.tmall.domain.entity.valueobject.GoodsAttr;

import java.util.List;
import java.util.Map;

public interface GoodsAttrMapper {
    int deleteByPrimaryKey(Long attrId);

    int deleteBySpuId(Long spuId);

    int insert(GoodsAttr record);

    int batchInsert(List<GoodsAttr> recordList);

    int insertSelective(GoodsAttr record);

    GoodsAttr selectByPrimaryKey(Long attrId);

    int updateByPrimaryKeySelective(GoodsAttr record);

    int updateByPrimaryKey(GoodsAttr record);

    List<GoodsAttr> selectGoodsAttrBySpuId(Long spuId);

    int batchInsertGoodsAttr(Map<String,Object> params);

    int batchDeleteGoodsAttr(List<Long> goodsAttrIdlist);
}