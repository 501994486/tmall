package com.tmall.domain.entity;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 商品sku类
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
@Data
public class GoodsSKU {
    private Long skuId;

    private Long spuId;

    private String skuSpec;

    private BigDecimal marketPrice;

    private BigDecimal discountPrice;

    private Integer skuStock;

    private Integer skuWarnNum;

    private Integer skuSaleNum;

    private Byte defaultFlag;

    private Byte DeleteFlag;

    private Integer sortOrder;

    private Date createTime;

    private Date updateTime;
}