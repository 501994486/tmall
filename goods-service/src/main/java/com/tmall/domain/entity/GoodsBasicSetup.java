package com.tmall.domain.entity;

import lombok.Data;

import java.util.Date;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 商品基本设定类
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
@Data
public class GoodsBasicSetup {
    private Integer baiscSetupId;

    private Integer eachBuyMaxQuantity;

    private Integer eachBuyMinQuantity;

    private Integer totalBuyMaxQuantity;

    private Integer deliveryMethodId;

    private Byte newFlag;

    private Byte soldOutMailFlag;

    private Byte stockWarnMailFlag;

    private Integer warnStock;

    private Byte stockShowWay;

    private Date createTime;

    private Date updateTime;

    private String stockStatus;
}