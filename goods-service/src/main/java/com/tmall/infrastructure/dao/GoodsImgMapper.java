package com.tmall.infrastructure.dao;

import com.tmall.domain.entity.valueobject.GoodsImg;

import java.util.List;

public interface GoodsImgMapper {
    int deleteByPrimaryKey(Long imgId);

    int deleteBySpuId(Long spuId);

    int insert(GoodsImg record);

    int batchInsert(List<GoodsImg> GoodsImgPOList);

    int insertSelective(GoodsImg record);

    GoodsImg selectByPrimaryKey(Long imgId);

    List<GoodsImg> selectBySpuId(Long spuId);

    int updateByPrimaryKeySelective(GoodsImg record);

    int updateByPrimaryKey(GoodsImg record);
}