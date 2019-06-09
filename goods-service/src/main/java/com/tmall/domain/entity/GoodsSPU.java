package com.tmall.domain.entity;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 商品spu类
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
@Data
public class GoodsSPU {
    private Long spuId;

    private Integer shopId;

    private String categoryIdPath;

    private Integer categoryId;

    private Integer brandId;

    private String goodsName;

    private String goodsMainPicture;

    private String goodsOutline;

    private String goodsDesc;

    private String goodsCode;

    private BigDecimal marketPrice;

    private Byte onSaleFlag;

    private BigDecimal discountPrice;

    private String goodsTip;

    private Integer goodStock;

    private String stockUnit;

    private String goodsSeoKeywords;

    private Byte skuFlag;

    private Byte saleFlag;

    private Byte sameBasicSetupFlag;

    private Integer eachBuyMinQuantity;

    private Integer eachBuyMaxQuantity;

    private Integer totalBuyMaxQuantity;

    private Integer deliveryMethodId;

    private Byte soldOutMailFlag;

    private Byte stockWarnMailFlag;

    private Integer warnStock;

    private Byte newFlag;

    private Byte bestFlag;

    private Byte hotFlag;

    private Byte recomFlag;

    private Byte deleteFlag;

    private Integer spuSaleNum;

    private Date saleTime;

    private Integer visitNum;

    private Integer appraiseNum;

    private Integer awardIntegral;

    private Byte goodsStatus;

    private String illegalRemarks;

    private Date createTime;

    private Date updateTime;
}