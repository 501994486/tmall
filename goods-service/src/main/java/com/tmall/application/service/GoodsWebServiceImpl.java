package com.tmall.application.service;


import com.tmall.domain.repository.GoodsWebRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoodsWebServiceImpl implements GoodsWebService {

	@Autowired
	private GoodsWebRepository goodsWebRepository;

	@Override
	public boolean updateGoodsCollectStatus(int userId, int spuId,int status) {

		return goodsWebRepository.updateGoodsCollectStatus(userId,spuId,status);
	}
}
