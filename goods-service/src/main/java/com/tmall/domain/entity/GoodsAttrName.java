package com.tmall.domain.entity;

import lombok.Data;

import java.util.Date;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 商品属性名表
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
@Data
public class GoodsAttrName {
    private Integer attrNameId;

    private String attrName;

    private Integer categoryId;

    private Byte essentialAttrFlag;

    private Byte attrType;

    private Byte showFlag;

    private Byte sortOrder;

    private Date createTime;

    private Date updateTime;
}