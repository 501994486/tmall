package com.tmall.application.service;

import com.tmall.domain.entity.Goods;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface GoodsService {

	Map<String,Object> getGoodsBriefIntroduction(long []id);

	boolean addGoods(Goods goods);

	boolean trashGoods(String[] spuIdArr);

	boolean deleteGoods(String[] spuIdArr);

	/**
	 * 查询当前shopId下所有的商品Map<categoryId,List>
	 * @param shopId
	 * @return
	 */
	Map<Integer, List<Goods>> getCategoryGoodsListMap(int shopId);

	String[] getGoodsCsvHeadList();

	List<String[]> getExportGoodsCsvDataList(List<Goods> goodsList);

	String convertListToString(List<String[]> goodsCsvDataList);

	Map<String,List<Goods>> getImportCsvGoodsList(int shopId, MultipartFile uploadFile,Map<String,Object> errorMap);

	List<Goods> getGoodList(int shopId,int categoryId,String... goodsIdArr);
 }
