package com.tmall.infrastructure.dao;

import com.tmall.domain.entity.GoodsSPU;

public interface GoodsSPUMapper {
    int deleteByPrimaryKey(Long spuId);

    int insert(GoodsSPU record);

    int insertSelective(GoodsSPU record);

    GoodsSPU selectByPrimaryKey(Long spuId);

    int updateByPrimaryKeySelective(GoodsSPU record);

    int updateByPrimaryKey(GoodsSPU record);
}