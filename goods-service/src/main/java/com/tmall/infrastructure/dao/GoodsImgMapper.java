package com.tmall.infrastructure.dao;

import com.tmall.domain.entity.GoodsImg;

public interface GoodsImgMapper {
    int deleteByPrimaryKey(Long imgId);

    int insert(GoodsImg record);

    int insertSelective(GoodsImg record);

    GoodsImg selectByPrimaryKey(Long imgId);

    int updateByPrimaryKeySelective(GoodsImg record);

    int updateByPrimaryKey(GoodsImg record);
}