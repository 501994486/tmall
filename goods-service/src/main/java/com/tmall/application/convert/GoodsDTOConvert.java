package com.tmall.application.convert;

import com.tmall.domain.entity.Goods;
import com.tmall.domain.repository.CategoryRepository;
import com.tmall.infrastructure.constants.GoodsConstants;
import com.tmall.common.AppConstants;
import com.tmall.common.utils.DateTimeUtils;
import com.tmall.ui.dto.GoodsDTO;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.InvocationTargetException;
import java.sql.Timestamp;

@Component
public class GoodsDTOConvert implements DTOConvert<GoodsDTO,Goods> {

	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public Goods convertNewData(GoodsDTO goodsDTO,int shopId) throws InvocationTargetException, IllegalAccessException {
		Goods goods = new Goods();
		BeanUtils.copyProperties(goods,goodsDTO);

		Timestamp currentTime = DateTimeUtils.getCurrentTimestamp();
		String categoryIdPath = categoryRepository.getCategoryIdPath(goods.getCategoryId());

		goods.setCreateTime(currentTime);
		goods.setUpdateTime(currentTime);
		goods.setShopId(shopId);
		goods.setCategoryIdPath(categoryIdPath);
		goods.setNewFlag(AppConstants.DB_FIELD_VALUE_YES);
		goods.setBestFlag(AppConstants.DB_FIELD_VALUE_NO);
		goods.setHotFlag(AppConstants.DB_FIELD_VALUE_NO);
		goods.setRecomFlag(AppConstants.DB_FIELD_VALUE_NO);
		goods.setDeleteFlag(AppConstants.DELETE_FLAG_NO);
		goods.setSpuSaleNum(AppConstants.ZERO);
		goods.setVisitNum(AppConstants.ZERO);
		goods.setGoodsStatus(GoodsConstants.GOODS_STATUS_UNREVIEWED);
		return goods;
	}

	@Override
	public Goods convertExistData(GoodsDTO goodsDTO,int shopId) throws InvocationTargetException, IllegalAccessException {
		Goods goods = new Goods();
		BeanUtils.copyProperties(goods,goodsDTO);
		return goods;
	}
}
