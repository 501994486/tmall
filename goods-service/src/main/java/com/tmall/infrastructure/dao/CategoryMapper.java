package com.tmall.infrastructure.dao;

import com.tmall.domain.entity.Category;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CategoryMapper {
    int deleteByPrimaryKey(Integer categoryId);

    int insert(Category record);

    int insertSelective(Category record);

    Category selectByPrimaryKey(Integer categoryId);

    int updateByPrimaryKeySelective(Category record);

    int updateByPrimaryKey(Category record);

    /**
     * 采用递归的方式resultMap与select不断互相调用
     * @param parentCategoryId
     * @return
     */
    Category selectChildrenCategoryListByParentCategoryId(Integer parentCategoryId);

    Category selectParentCategoryByCategoryId(Integer categoryId);

    int selectParentCategoryMaxSortOrder(@Param("shopId") int shopId,@Param("parentCategoryId") int parentCategoryId);

    List<Category> selectAllCategoryByShopId(int shopId);
}