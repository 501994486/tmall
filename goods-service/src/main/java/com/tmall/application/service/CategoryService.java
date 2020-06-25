package com.tmall.application.service;

import com.tmall.domain.entity.Category;
import com.tmall.domain.entity.Goods;

import java.util.List;
import java.util.Map;

public interface CategoryService {

	boolean addGoodsCategory(Category category);

	boolean updateGoodsCategory(Category category);

	boolean deleteGoodsCategory(int categoryId);

	Category getGoodsCategory(int categoryId);

	List<Category> getAllCategoryByShopId(int shopId);

	Map<String, Object> getGoodsManagementTreeData(List<Category> categoryList, Map<Integer,List<Goods>> categoryGoddsListMap);
}
