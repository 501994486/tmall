package com.tmall.application.service;


import com.tmall.domain.repository.GoodsWebRepository;
import com.tmall.infrastructure.vo.GoodsHotVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoodsWebServiceImpl implements GoodsWebService {

	@Autowired
	private GoodsWebRepository goodsWebRepository;

	/**
	 * 更新商品收藏
	 * @param userId
	 * @param spuId
	 * @param status
	 * @return
	 */
	@Override
	public boolean updateGoodsCollectStatus(int userId, int spuId,int status) {

		return goodsWebRepository.updateGoodsCollectStatus(userId,spuId,status);
	}

	/**
	 * 更新商品库存
	 * @param spuId
	 * @param skuId
	 * @param quantity
	 * @return
	 */
	@Override
	public boolean updateGoodsStock(long spuId,long skuId,int quantity){
		return goodsWebRepository.updateGoodsStock(spuId, skuId, quantity);
	}

	/**
	 * 获取热卖排行榜
	 * @param pageNum
	 * @param rows
	 * @return
	 */
	@Override
	public List<GoodsHotVo> getGoodsHotTop(int pageNum, int rows){
		return goodsWebRepository.getGoodsHotTop(pageNum,rows);
	}
}
