package com.tmall.application.service;

import com.tmall.domain.entity.Category;
import com.tmall.domain.entity.Goods;
import com.tmall.domain.repository.CategoryRepository;
import com.tmall.domain.service.TreeDomainService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private TreeDomainService treeDomainService;

	@Override
	public boolean addGoodsCategory(Category category) {
		return categoryRepository.addGoodsCategory(category);
	}

	@Override
	public boolean updateGoodsCategory(Category category) {
		return categoryRepository.updateGoodsCategory(category);
	}

	@Override
	public boolean deleteGoodsCategory(int categoryId) {
		return categoryRepository.deleteGoodsCategory(categoryId);
	}

	@Override
	public Category getGoodsCategory(int categoryId) {
		return categoryRepository.getGoodsCategory(categoryId);
	}

	@Override
	public List<Category> getAllCategoryByShopId(int shopId) {
		return categoryRepository.getAllCategoryByShopId(shopId);
	}
	@Override
	public Map<String, Object> getGoodsManagementTreeData(List<Category> categoryList, Map<Integer, List<Goods>> categoryGoddsListMap) {
		return treeDomainService.getGoodsManagementTreeData(categoryList,categoryGoddsListMap);
	}
}
