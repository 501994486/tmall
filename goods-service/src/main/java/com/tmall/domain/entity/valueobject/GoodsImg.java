package com.tmall.domain.entity.valueobject;

import lombok.Data;

import java.util.Date;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 商品图片类
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
@Data
public class GoodsImg {
    private Long imgId;

    private Long spuId;

    private Long skuId;

    private String imgFileName;

    private String imgPath;

    private String imgTitle;

    private String imgDesc;

    private Integer sortOrder;

    private Date createTime;
    
}