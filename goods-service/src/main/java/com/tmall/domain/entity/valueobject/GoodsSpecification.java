package com.tmall.domain.entity.valueobject;

import lombok.Data;

import java.util.Date;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 商品规格值类
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
@Data
public class GoodsSpecification {
    private Integer itemId;

    private Integer categoryId;

    private Long skuId;

    private String itemName;

    private String itemDesc;

    private String itemImg;

    private Byte deleteFlag;

    private Date createTime;

    private Date updateTime;
}