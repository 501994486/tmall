package com.tmall.application.service;

import com.tmall.domain.entity.valueobject.GoodsBasicSetup;

public interface GoodsBasicSetupService {

	GoodsBasicSetup getGoodsBasicSetup(int shopId);

	boolean updateGoodsBasicSetup(GoodsBasicSetup goodsBasicSetup);
}
