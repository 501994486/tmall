package com.tmall.domain.entity.valueobject;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 商品sku类
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
@Data
public class GoodsSku {
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

    private List<GoodsSpecification> goodsSpecificationList;

    private List<GoodsImg> goodsImgList;

    public int decreaseStock(int quantity){
        if(this.skuStock - quantity < 0){
            return -1;
        }
        return this.skuStock - quantity;
    }
}