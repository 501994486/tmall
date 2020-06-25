package com.tmall.domain.repository;

import com.tmall.domain.entity.Goods;

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
public interface GoodsRepository {
	/**
	 * 增加GOODS_SPU/GOODS_IMG/GOODS_ATTR/GOODS_ATTR_NAME/GOODS_ATTR_VALUE
	 * @param goods
	 */
	boolean addGoods(Goods goods);

	boolean trashGoods(String[] spuIdArr);

	/**
	 * 更改is_delete
	 * @param spuIdArr
	 */
	boolean deleteGoods(String[] spuIdArr);

	/**
	 * 可能更改GOODS_SPU
	 * 可能更改或增加GOODS_IMG/GOODS_ATTR/GOODS_ATTR_NAME/GOODS_ATTR_VALUE
	 * GOODS_SKU/GOODS_SPECIFICATION
	 *
	 * @param goods
	 */
	void updateGoods(Goods goods)throws InvocationTargetException, IllegalAccessException;

	/**
	 * 查询Goods信息
	 * GOODS_IMG/GOODS_ATTR/GOODS_ATTR_NAME/GOODS_ATTR_VALUE
	 * GOODS_SKU/GOODS_SPECIFICATION信息
	 * @param spuId
	 * @return
	 */
	Goods getGoodsByPk(long spuId)throws InvocationTargetException, IllegalAccessException;

	/**
	 * 查询Goods信息
	 * @param categoryId
	 * @return
	 */
	List<Goods> getGoodsByCategoryId(int categoryId);

	/**
	 * 查询Goods信息
	 * @param categoryId
	 * @param shopId
	 * @return
	 */
	List<Goods> getGoodsByCategoryIdAndShopId(int categoryId,int shopId);

	/**
	 * 用户端输入查询信息，搜索是否具有用户输入信息的关键字的商品
	 * @param seoKeyword
	 * @return
	 */
	List<Goods> getGoodsBySeoKeyword(String seoKeyword);

	/**
	 * 获取商品的精简信息
	 * @param spuId
	 * @return
	 */
	Map<String,Object> getGoodsBriefIntroductionByPk(long[] spuId);

}
