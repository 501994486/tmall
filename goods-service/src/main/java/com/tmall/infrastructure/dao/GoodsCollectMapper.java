package com.tmall.infrastructure.dao;

import com.tmall.domain.entity.Category;
import com.tmall.domain.entity.valueobject.GoodsCollect;
import org.apache.ibatis.annotations.Param;

import java.sql.Timestamp;
import java.util.List;

public interface GoodsCollectMapper {

	GoodsCollect getLastCollectTime();

	int batchInsert(List<GoodsCollect> goodsCollectList);

}