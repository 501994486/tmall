package com.tmall.infrastructure.dao;

import com.tmall.domain.entity.Goods;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface GoodsSpuMapper {
    int deleteByPrimaryKey(Long spuId);

    int insert(Goods record);

    int insertSelective(Goods record);

    Goods selectByPrimaryKey(Long spuId);

    int updateByPrimaryKeySelective(Goods record);

    int updateByPrimaryKey(Goods record);

    List<Goods> selectGoodsProductSPUListByShopId(@Param("shopId") int shopId);

    /**
     * 限制查询时间10s
     * @param shopId
     * @param categoryId
     * @return
     */
    List<Goods> selectGoodsProductSPUListByShopIdAndCategoryId(@Param("shopId") int shopId, @Param("categoryId") int categoryId);
}