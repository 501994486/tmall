package com.tmall.ui.dto;

import com.tmall.domain.entity.valueobject.GoodsImg;
import com.tmall.domain.entity.valueobject.GoodsSpecification;
import lombok.Data;

import javax.validation.constraints.Digits;
import java.math.BigDecimal;
import java.util.List;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 商品sku类
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
@Data
public class GoodsSkuDTO {
    private Long skuId;

    private Long spuId;

    private String skuSpec;

    @Digits(integer=10, fraction=2)
    private BigDecimal marketPrice;

    @Digits(integer=10, fraction=2)
    private BigDecimal discountPrice;

    private Integer skuStock;

    private Integer skuWarnNum;

    private Integer skuSaleNum;

    private Byte defaultFlag;

    private Integer sortOrder;

    private String createTime;

    private String updateTime;

    private List<GoodsSpecification> goodsSpecificationList;

    private List<GoodsImg> goodsImgList;

}