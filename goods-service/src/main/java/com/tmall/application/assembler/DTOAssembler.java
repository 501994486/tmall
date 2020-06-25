package com.tmall.application.assembler;

import com.tmall.domain.entity.Category;
import com.tmall.domain.entity.valueobject.GoodsBasicSetup;
import com.tmall.ui.dto.CategoryDTO;
import com.tmall.ui.dto.GoodsBasicSetupDTO;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.stereotype.Component;

import java.lang.reflect.InvocationTargetException;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description DTO组装工具类，用于组装服务中所有dto对象
 * @author sun.h
 * @date   2020年5月18日
 * @version V1.0
 */
@Component
public class DTOAssembler {

	public static GoodsBasicSetupDTO assemblerGoodsBasicSetupDTO(GoodsBasicSetup goodsBasicSetup) throws InvocationTargetException, IllegalAccessException {
		GoodsBasicSetupDTO goodsBasicSetupDTO = new GoodsBasicSetupDTO();

		BeanUtils.copyProperties(goodsBasicSetupDTO,goodsBasicSetup);

		return goodsBasicSetupDTO;
	}

	public static CategoryDTO assemblerGoodsCategory(Category category) throws InvocationTargetException, IllegalAccessException {
		CategoryDTO categoryDTO = new CategoryDTO();

		BeanUtils.copyProperties(categoryDTO,category);

		return categoryDTO;
	}
}
