package com.tmall.application.service;

import com.tmall.domain.entity.valueobject.GoodsBasicSetup;
import com.tmall.domain.repository.GoodsBasicSetupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoodsBasicSetupSericeImpl implements GoodsBasicSetupService{

	@Autowired
	private GoodsBasicSetupRepository goodsBasicSetupRepository;

	@Override
	public GoodsBasicSetup getGoodsBasicSetup(int shopId){
		GoodsBasicSetup goodsBasicSetup = goodsBasicSetupRepository.getGoodsBasicSetup(shopId);

		return goodsBasicSetup;
	}

	@Override
	public boolean updateGoodsBasicSetup(GoodsBasicSetup goodsBasicSetup) {
		return goodsBasicSetupRepository.updateGoodsBasicSetup(goodsBasicSetup);
	}

}
