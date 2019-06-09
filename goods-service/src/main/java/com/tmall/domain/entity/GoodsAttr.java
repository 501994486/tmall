package com.tmall.domain.entity;

import lombok.Data;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 商品属性名值关联类
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
@Data
public class GoodsAttr {
    private Long attrId;

    private Integer goodsId;

    private Integer goodsAttrNameId;

    private Integer goodsAttrValueId;
}