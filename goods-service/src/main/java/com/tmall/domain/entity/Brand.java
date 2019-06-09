package com.tmall.domain.entity;

import lombok.Data;

import java.util.Date;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 商品品牌类
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
@Data
public class Brand {
    private Integer brandId;

    private String brandName;

    private String brandImg;

    private String brandDesc;

    private Byte deleteFlag;

    private Date createTime;

    private Date updateTime;

}