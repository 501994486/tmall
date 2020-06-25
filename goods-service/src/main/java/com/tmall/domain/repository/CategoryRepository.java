package com.tmall.domain.repository;

import com.tmall.domain.entity.Category;

import java.util.List;

public interface CategoryRepository {

	boolean addGoodsCategory(Category category);

	int getNewSortOrder(int shopId,int parentCategoryId);

	boolean updateGoodsCategory(Category category);

	boolean deleteGoodsCategory(int categoryId);

	Category getGoodsCategory(int categoryId);

	String getCategoryIdPath(int categoryId);

	List<Category> getAllCategoryByShopId(int shopId);
}
