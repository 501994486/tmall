package com.tmall.domain.repository;

import com.tmall.domain.entity.valueobject.GoodsBasicSetup;

public interface GoodsBasicSetupRepository {

	GoodsBasicSetup getGoodsBasicSetup(int shopId);

	boolean updateGoodsBasicSetup(GoodsBasicSetup goodsBasicSetup);
}
