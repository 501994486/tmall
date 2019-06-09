package com.tmall.infrastructure.dao;

import com.tmall.domain.entity.Category;

public interface CategoryMapper {
    int deleteByPrimaryKey(Integer categoryId);

    int insert(Category record);

    int insertSelective(Category record);

    Category selectByPrimaryKey(Integer categoryId);

    int updateByPrimaryKeySelective(Category record);

    int updateByPrimaryKey(Category record);
}