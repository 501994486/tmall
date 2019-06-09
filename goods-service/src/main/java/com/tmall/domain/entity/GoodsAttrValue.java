package com.tmall.domain.entity;

import lombok.Data;

import java.util.Date;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 商品属性值
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
@Data
public class GoodsAttrValue {
    private Integer attrValueId;

    private String attrValue;

    private Byte showFlag;

    private Byte sortOrder;

    private Date createTime;

    private Date updateTime;

}