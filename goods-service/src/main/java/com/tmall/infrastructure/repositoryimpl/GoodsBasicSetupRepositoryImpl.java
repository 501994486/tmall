package com.tmall.infrastructure.repositoryimpl;

import com.tmall.domain.entity.valueobject.GoodsBasicSetup;
import com.tmall.domain.repository.GoodsBasicSetupRepository;
import com.tmall.infrastructure.dao.GoodsBasicSetupMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 商品基本设定仓储类
 * @author sun.h
 * @date   2020年5月18日
 * @version V1.0
 */
@Repository
public class GoodsBasicSetupRepositoryImpl implements GoodsBasicSetupRepository {

	@Autowired
	private GoodsBasicSetupMapper goodsBasicSetupMapper;

	@Override
	public GoodsBasicSetup getGoodsBasicSetup(int shopId){
		return goodsBasicSetupMapper.selectByPrimaryKey(shopId);
	}

	@Override
	public boolean updateGoodsBasicSetup(GoodsBasicSetup goodsBasicSetup){
		if(goodsBasicSetupMapper.updateByPrimaryKey(goodsBasicSetup) > 0){
			return true;
		}
		return false;
	}

}
