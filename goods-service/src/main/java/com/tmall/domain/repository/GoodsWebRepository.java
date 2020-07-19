package com.tmall.domain.repository;

import com.tmall.domain.entity.Goods;
import com.tmall.infrastructure.vo.GoodsHotVo;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 商品仓储类
 * @author sun.h
 * @date   2019年7月11日
 * @version V1.0
 */
public interface GoodsWebRepository {
	boolean updateGoodsStock(long spuId,long skuId,int quantity);

	boolean updateGoodsCollectStatus(int userId, int sputId,int status);

	boolean transGoodsCollectDataFromRedis();

	void initGoodsSellTop();

	List<GoodsHotVo> getGoodsHotTop(int pageNum, int rows);
}
