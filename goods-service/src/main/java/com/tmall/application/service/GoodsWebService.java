package com.tmall.application.service;

import com.tmall.infrastructure.vo.GoodsHotVo;

import java.util.List;

public interface GoodsWebService {

	boolean updateGoodsCollectStatus(int userId,int spuId,int status);

	boolean updateGoodsStock(long spuId,long skuId,int quantity);

	List<GoodsHotVo> getGoodsHotTop(int pageNum, int rows);
}
