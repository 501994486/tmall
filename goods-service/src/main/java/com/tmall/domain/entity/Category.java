package com.tmall.domain.entity;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 商品类别类
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
@Data
public class Category {
    private Integer categoryId;

    private Integer parentCategoryId;

    private int shopId;

    private String categoryName;

    private Byte status;

    private BigDecimal commissionRate;

    private Integer sortOrder;

    private Byte showFlag;

    private Byte deleteFlag;

    private Date createTime;

    private Date updateTime;
}