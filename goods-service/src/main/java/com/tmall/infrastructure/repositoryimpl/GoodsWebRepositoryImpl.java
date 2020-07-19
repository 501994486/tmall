package com.tmall.infrastructure.repositoryimpl;

import com.tmall.common.AppConstants;
import com.tmall.common.CommonLogic;
import com.tmall.common.utils.DateTimeUtils;
import com.tmall.domain.entity.Goods;
import com.tmall.domain.entity.valueobject.GoodsCollect;
import com.tmall.domain.entity.valueobject.GoodsSku;
import com.tmall.domain.repository.GoodsWebRepository;
import com.tmall.infrastructure.dao.GoodsCollectMapper;
import com.tmall.infrastructure.dao.GoodsWebMapper;
import com.tmall.infrastructure.redis.RedisKeyUtil;
import com.tmall.infrastructure.redis.RedisService;
import com.tmall.infrastructure.vo.GoodsHotVo;
import org.apache.commons.collections.CollectionUtils;
import org.elasticsearch.common.util.set.Sets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Repository;
import java.util.stream.Stream.Builder;
import java.sql.Timestamp;
import java.util.*;

/**
 * 商品用户册相关功能
 * @author sunhao
 * @date   2020年7月11日
 * @version V1.0
 */
@Repository
public class GoodsWebRepositoryImpl implements GoodsWebRepository {

	@Autowired
	private GoodsWebMapper goodsWebMapper;

	@Autowired
	private GoodsCollectMapper goodsCollectMapper;

	@Autowired
	private HashOperations<String, String, Object> hashOperations;

	@Autowired
	private ZSetOperations<String, GoodsHotVo> zSetOperations;

	/**
	 * 更新商品库存，使用乐观锁解决并发问题
	 * @param spuId
	 * @param skuId
	 * @param quantity
	 * @return
	 */
	@Override
	public boolean updateGoodsStock(long spuId,long skuId,int quantity) {
		Map<String,Object> updateParams = new HashMap<>();
		Timestamp currentTimestamp = DateTimeUtils.getCurrentTimestamp();

		if(skuId == 0){
			do {
				Goods goodsDB = goodsWebMapper.selectGoodsSpuBySpuId(spuId);
				int newQuantity = goodsDB.decreaseStock(quantity);
				if (newQuantity == AppConstants.ERROR_CODE) {
					return false;
				}

				updateParams.put("spuId", spuId);
				updateParams.put("goodsStock", newQuantity);
				updateParams.put("updateTime", currentTimestamp);
				updateParams.put("updateTimeVersion", goodsDB.getUpdateTime());
			} while(goodsWebMapper.updateGoodsSpuStock(updateParams) == 0);

		} else {
			do {
				Goods goodsDB = goodsWebMapper.selectGoodsSpuBySpuId(spuId);
				GoodsSku goodsSkuDB = goodsWebMapper.selectGoodsSkuBySkuId(skuId);
				int newQuantity = goodsDB.decreaseStock(quantity);
				int newSkuQuantity = goodsSkuDB.decreaseStock(quantity);
				if (newSkuQuantity == AppConstants.ERROR_CODE) {
					return false;
				}

				updateParams.put("spuId", spuId);
				updateParams.put("goodsStock", newQuantity);
				updateParams.put("skuStock", newSkuQuantity);
				updateParams.put("updateTime", currentTimestamp);
				updateParams.put("updateTimeVersion", goodsSkuDB.getUpdateTime());
			} while(goodsWebMapper.updateGoodsSkuStock(updateParams) == 0
				&& goodsWebMapper.updateGoodsSpuStock(updateParams) == 0);
		}

		return true;
	}

	/**
	 * 更新商品收藏信息 redis
	 * @param userId
	 * @param spuId
	 * @return
	 */
	@Override
	public boolean updateGoodsCollectStatus(int userId, int spuId,int status) {
		String key = RedisKeyUtil.getKeyWithColumn("gc",String.valueOf(userId),String.valueOf(spuId),String.valueOf(DateTimeUtils.getCurrentEpochTimeMillis()));
		hashOperations.put(RedisKeyUtil.MAP_KEY_GOODS_COLLECT,key,status);
		return true;
	}

	/**
	 * 从redis库存中获取到商品收藏信息
	 * @return
	 */
	private List<GoodsCollect> getGoodsCollectDataFromRedis() {

		Cursor<Map.Entry<String, Object>> cursor = hashOperations.scan(RedisKeyUtil.MAP_KEY_GOODS_COLLECT, ScanOptions.NONE);
		List<GoodsCollect> goodsCollectList = new ArrayList<>();
		while (cursor.hasNext()){
			GoodsCollect goodsCollect = new GoodsCollect();
			Map.Entry<String, Object> entry = cursor.next();
			String key = entry.getKey();

			String[] split = key.split(":");
			String userId = split[1];
			String spuId = split[2];
			String collectTime = split[3];
			Integer value = (Integer) entry.getValue();


			if(value == AppConstants.DB_FIELD_VALUE_YES){
				goodsCollect.setUserId(Integer.parseInt(userId));
				goodsCollect.setUserId(Integer.parseInt(spuId));
				goodsCollect.setCollectTime(DateTimeUtils.getTimestampByEpochTime(Long.parseLong(collectTime)));
				goodsCollectList.add(goodsCollect);
			}

			//存到 list 后从 Redis 中删除
			hashOperations.delete(RedisKeyUtil.MAP_KEY_GOODS_COLLECT, key);
		}


		return goodsCollectList;
	}

	/**
	 * 将redis数据导入到mysql
	 * @return
	 */
	@Override
	public boolean transGoodsCollectDataFromRedis(){
		List<GoodsCollect> goodsCollectList = this.getGoodsCollectDataFromRedis();
		goodsCollectMapper.batchInsert(goodsCollectList);

		return  true;
	}

	/**
	 * 初始化 热销商品到redis
	 */
	@Override
	public void initGoodsSellTop() {

		List<Goods> allHotGoods = goodsWebMapper.selectAllHotGoods();

		List<GoodsHotVo> goodsVoList = new ArrayList<>();
		for (Goods hotGoods : allHotGoods) {
			GoodsHotVo goodsHotVo = GoodsHotVo.builder()
					.spuId(hotGoods.getSpuId())
					.goodsName(hotGoods.getGoodsName())
					.goodsMainPicture(hotGoods.getGoodsMainPicture())
					.goodsCode(hotGoods.getGoodsCode())
					.spuSaleNum(hotGoods.getSpuSaleNum())
					.build();

			zSetOperations.add(RedisKeyUtil.ZSET_KEY_GOODS_SALES_RANDING,goodsHotVo,goodsHotVo.getSpuSaleNum());
		}
	}

	/**
	 * 获取热卖排行榜
	 * @param pageNum
	 * @param rows
	 * @return
	 */
	@Override
	public List<GoodsHotVo> getGoodsHotTop(int pageNum,int rows){
		Set<GoodsHotVo> goodsHotTop = zSetOperations.reverseRange(RedisKeyUtil.ZSET_KEY_GOODS_SALES_RANDING,0,-1);

		List<GoodsHotVo> goodsHotTopList = new ArrayList<>();
		goodsHotTopList.addAll(goodsHotTop);

		return new ArrayList<>(goodsHotTopList.subList(pageNum,rows));
	}
}
