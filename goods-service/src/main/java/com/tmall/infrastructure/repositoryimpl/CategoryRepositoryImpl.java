package com.tmall.infrastructure.repositoryimpl;

import com.tmall.domain.entity.Category;
import com.tmall.domain.repository.CategoryRepository;
import com.tmall.infrastructure.dao.CategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 类别仓储类
 * @author sun.h
 * @date   2020年5月18日
 * @version V1.0
 */
public class CategoryRepositoryImpl implements CategoryRepository {

	@Autowired
	private CategoryMapper categoryMapper;

	@Override
	public boolean addGoodsCategory(Category category) {
		if(categoryMapper.insertSelective(category) > 0) {
			return true;
		}
		return false;
	}

	@Override
	public int getNewSortOrder(int shopId, int parentCategoryId) {
		int maxSortOrder = categoryMapper.selectParentCategoryMaxSortOrder(shopId,parentCategoryId);
		return new Category().getNewShowOrder(maxSortOrder);
	}

	@Override
	public boolean updateGoodsCategory(Category category) {
		if(categoryMapper.updateByPrimaryKey(category) > 0) {
			return true;
		}
		return false;
	}

	@Override
	public boolean deleteGoodsCategory(int categoryId) {
		if(categoryMapper.deleteByPrimaryKey(categoryId) > 0) {
			return true;
		}
		return false;
	}

	@Override
	public Category getGoodsCategory(int categoryId) {
		return categoryMapper.selectByPrimaryKey(categoryId);
	}

	@Override
	public String getCategoryIdPath(int categoryId) {
		return null;
	}

	@Override
	public List<Category> getAllCategoryByShopId(int shopId) {
		return categoryMapper.selectAllCategoryByShopId(shopId);
	}
}
