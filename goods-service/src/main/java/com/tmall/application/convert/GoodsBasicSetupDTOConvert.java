package com.tmall.application.convert;

import com.tmall.domain.entity.valueobject.GoodsBasicSetup;
import com.tmall.ui.dto.GoodsBasicSetupDTO;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.stereotype.Component;

@Component("goodsBasicSetupDTOConvert")
public class GoodsBasicSetupDTOConvert implements DTOConvert<GoodsBasicSetupDTO, GoodsBasicSetup>{

	@Override
	public GoodsBasicSetup convertNewData(GoodsBasicSetupDTO goodsBasicSetupDTO,int shopId) throws Exception {
		GoodsBasicSetup goodsBasicSetup = new GoodsBasicSetup();
		BeanUtils.copyProperties(goodsBasicSetup,goodsBasicSetupDTO);

		return goodsBasicSetup;
	}

	@Override
	public GoodsBasicSetup convertExistData(GoodsBasicSetupDTO goodsBasicSetupDTO,int shopId) throws Exception {
		GoodsBasicSetup goodsBasicSetup = new GoodsBasicSetup();
		BeanUtils.copyProperties(goodsBasicSetup,goodsBasicSetupDTO);

		return goodsBasicSetup;
	}
}
