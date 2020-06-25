package com.tmall.domain.entity.valueobject;

import lombok.Data;

import java.util.List;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 商品属性值
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
@Data
public class GoodsAttr {
    private Long spuId;
    private Long attrId;
    private GoodsAttrName goodsAttrName;
    private List<GoodsAttrValue> goodsAttrValueList;

}