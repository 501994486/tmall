package com.tmall.application.convert;

import com.tmall.domain.entity.Category;
import com.tmall.domain.repository.CategoryRepository;
import com.tmall.common.AppConstants;
import com.tmall.common.utils.DateTimeUtils;
import com.tmall.ui.dto.CategoryDTO;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
public class CategoryDTOConvert implements DTOConvert<CategoryDTO, Category>{

	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public Category convertNewData(CategoryDTO categoryDTO, int shopId) throws Exception {

		Category category = new Category();
		BeanUtils.copyProperties(category,categoryDTO);

		Timestamp currentTime = DateTimeUtils.getCurrentTimestamp();
		int sortOrderId = categoryRepository.getNewSortOrder(shopId, category.getParentCategoryId());

		category.setShopId(shopId);
		category.setCreateTime(currentTime);
		category.setUpdateTime(currentTime);
		category.setSortOrder(sortOrderId);
		category.setDeleteFlag(AppConstants.DELETE_FLAG_NO);

		return category;
	}

	@Override
	public Category convertExistData(CategoryDTO categoryDTO, int shopId) throws Exception {
		return null;
	}
}
