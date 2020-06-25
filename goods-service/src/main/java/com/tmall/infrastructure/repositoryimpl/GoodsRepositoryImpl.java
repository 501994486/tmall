package com.tmall.infrastructure.repositoryimpl;

import com.tmall.domain.entity.Goods;
import com.tmall.domain.entity.valueobject.GoodsAttr;
import com.tmall.domain.entity.valueobject.GoodsImg;
import com.tmall.domain.repository.GoodsRepository;
import com.tmall.infrastructure.dao.GoodsAttrMapper;
import com.tmall.infrastructure.dao.GoodsAttrValueMapper;
import com.tmall.infrastructure.dao.GoodsImgMapper;
import com.tmall.infrastructure.dao.GoodsSpuMapper;
import com.tmall.common.snowflakeId.SnowflakeIdWorker;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 商品的仓储类:包括redis/elasticsearch/mysql的商品相关数据
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
@Repository
public class GoodsRepositoryImpl implements GoodsRepository {

	@Autowired
	private GoodsSpuMapper goodsSPUMapper;

	@Autowired
	private GoodsImgMapper goodsImgMapper;

	@Autowired
	private GoodsAttrMapper goodsAttrMapper;

	@Autowired
	private GoodsAttrValueMapper goodsAttrValueMapper;

	@Autowired
	private SnowflakeIdWorker snowflakeIdWorker;
	/**
	 * 添加商品
	 * @param goods
	 * @throws InvocationTargetException
	 * @throws IllegalAccessException
	 */
	@Transactional
	@Override
	public boolean addGoods(Goods goods)  {
		Long goodsId = snowflakeIdWorker.nextId(); //分布式id 去除换行符

		// 增加GOODS_SPU表数据
		goodsSPUMapper.insert(goods);

		// 增加GOODS_IMG
		List<GoodsImg> goodsImgListParam = new ArrayList<>();
		List<GoodsImg> goodsImgList = goods.getGoodsImgList();
		GoodsImg goodsImgPO = new GoodsImg();
		for(GoodsImg goodsImg : goodsImgList){
		//	BeanUtils.copyProperties(goodsImgPO,goodsImg);
			goodsImgListParam.add(goodsImgPO);
		}
		goodsImgMapper.batchInsert(goodsImgListParam);

		//增加GOODS_ATTR(text情况下添加GOODS_ATTR_VALUE表数据)
		List <GoodsAttr> goodsAttrPOList = new ArrayList<>();
		GoodsAttr goodsAttrPO = null;

	/*	List<GoodsAttr> goodsAttrsMap = goods.getGoodsAttrs();
		Set goodsAttrsEntrySet = goodsAttrsMap.entrySet();
		Iterator goodsAttrsEntryIterator = goodsAttrsEntrySet.iterator();
		while (goodsAttrsEntryIterator.hasNext()){
			Map.Entry goodsAttrsEntry = (Map.Entry)goodsAttrsEntryIterator.next();
			GoodsAttrName goodsAttrName = (GoodsAttrName)goodsAttrsEntry.getKey();
			List<GoodsAttrValue> goodsAttrValueList = (List)goodsAttrsEntry.getValue();

			if (goodsAttrName.getAttrType() == GoodsConstants.ATTR_TYPE_TEXT){
				GoodsAttrValue goodsAttrValueParam = new GoodsAttrValue();
				BeanUtils.copyProperties(goodsAttrValueParam,goodsAttrValueList.get(0));
				goodsAttrValueMapper.insert(goodsAttrValueParam);
			}

			for (GoodsAttrValue goodsAttrValue : goodsAttrValueList){
				goodsAttrPO = new GoodsAttr();
				goodsAttrPO.setSpuId(goodsId);
				goodsAttrPO.setAttrNameId(goodsAttrName.getAttrNameId());
				long id = snowflakeIdWorker.nextId();//分布式雪花算法生成暂时替代
				goodsAttrPO.setSpuId(id);
				goodsAttrPO.setAttrValueId(goodsAttrValue.getAttrValueId());
				goodsAttrPOList.add(goodsAttrPO);
			}
		}*/
			if(goodsAttrMapper.batchInsert(goodsAttrPOList) > 0){
				return true;
			}

		return false;
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public boolean trashGoods(String[] spuIdArr) {
		return false;
	}

	/**
	 *
	 * @param spuIdArr
	 */
	@Override
	@Transactional
	public boolean deleteGoods(String[] spuIdArr) {
		/*goodsSPUMapper.deleteByPrimaryKey(spuId);
		goodsImgMapper.deleteBySpuId(spuId);
		goodsAttrMapper.deleteBySpuId(spuId);*/

		return true;
		//手动回滚 TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
	}

	@Override
	public void updateGoods(Goods goods)throws InvocationTargetException, IllegalAccessException {

	/*	long spuId = goods.getSpuId();
		// 修改GOODS_SPU表数据
		goodsSPUMapper.updateByPrimaryKeySelective(goods);

		// 修改GOODS_IMG
		List<GoodsImg> goodsImgListParam = new ArrayList<>();
		List<GoodsImg> goodsImgList = goods.getGoodsImgList();
		GoodsImg goodsImgPO = new GoodsImg();
		for(GoodsImg goodsImg : goodsImgList){
			BeanUtils.copyProperties(goodsImgPO,goodsImg);
			goodsImgListParam.add(goodsImgPO);
		}
		goodsImgMapper.deleteBySpuId(spuId);
		goodsImgMapper.batchInsert(goodsImgListParam);

		//改变GOODS_ATTR(text情况下添加GOODS_ATTR_VALUE表数据)
		List <GoodsAttr> goodsAttrPOList = new ArrayList<>();
		GoodsAttr goodsAttrPO = null;

		Map<GoodsAttrName,List<GoodsAttrValue>> goodsAttrsMap = goods.getGoodsAttrs();
		Set goodsAttrsEntrySet = goodsAttrsMap.entrySet();
		Iterator goodsAttrsEntryIterator = goodsAttrsEntrySet.iterator();
		while (goodsAttrsEntryIterator.hasNext()){
			Map.Entry goodsAttrsEntry = (Map.Entry)goodsAttrsEntryIterator.next();
			GoodsAttrName goodsAttrName = (GoodsAttrName)goodsAttrsEntry.getKey();
			List<GoodsAttrValue> goodsAttrValueList = (List)goodsAttrsEntry.getValue();

			if (goodsAttrName.getAttrType() == GoodsConstants.ATTR_TYPE_TEXT){
				GoodsAttrValue goodsAttrValueParam = new GoodsAttrValue();
				BeanUtils.copyProperties(goodsAttrValueParam,goodsAttrValueList.get(0));
				goodsAttrValueMapper.insert(goodsAttrValueParam);
			}

			for (GoodsAttrValue goodsAttrValue : goodsAttrValueList){
				goodsAttrPO = new GoodsAttr();
				goodsAttrPO.setSpuId(spuId);
				goodsAttrPO.setGoodsAttrNameId(goodsAttrName.getAttrNameId());
				long id = snowflakeIdWorker.nextId();//分布式雪花算法生成暂时替代
				goodsAttrPO.setGoodsAttrId(id);
				goodsAttrPO.setGoodsAttrValueId(goodsAttrValue.getAttrValueId());
				goodsAttrPOList.add(goodsAttrPO);
			}
		}
		goodsAttrMapper.deleteBySpuId(spuId);
		goodsAttrMapper.batchInsert(goodsAttrPOList);*/
	}

	@Override
	public Goods getGoodsByPk(long spuId) throws InvocationTargetException, IllegalAccessException{

		// 查询GOODS_SPU表数据
		Goods goods = goodsSPUMapper.selectByPrimaryKey(spuId);

		// 查询GOODS_IMG
		List<GoodsImg> goodsImgPOListDB = goodsImgMapper.selectBySpuId(spuId);
		List<GoodsImg>goodsImgList = new ArrayList<>();
		GoodsImg goodsImg = null;
		for (GoodsImg goodsImgPO : goodsImgPOListDB){
			goodsImg = new GoodsImg();
			BeanUtils.copyProperties(goodsImg,goodsImgPO);
			goodsImgList.add(goodsImg);
		}
		goods.setGoodsImgList(goodsImgList);
		//img不需要update time只要有增加时间即可



		return null;
	}

	@Override
	public List<Goods> getGoodsByCategoryId(int categoryId) {
		return null;
	}

	@Override
	public List<Goods> getGoodsByCategoryIdAndShopId(int categoryId, int shopId) {
		return null;
	}

	@Override
	public List<Goods> getGoodsBySeoKeyword(String seoKeyword) {
		return null;
	}

	@Override
	public Map<String,Object> getGoodsBriefIntroductionByPk(long[] spuId) {
		Map<String,Object> resultMap = new HashMap<>();
		resultMap.put("result","success");
		return resultMap;
	}
}
