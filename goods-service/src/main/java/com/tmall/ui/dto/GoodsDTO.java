package com.tmall.ui.dto;

import com.tmall.domain.entity.valueobject.GoodsAttr;
import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
public class GoodsDTO {

	private Long spuId;

	private Integer categoryId;

	private Integer brandId;

	@NotNull(message = "goodsName不能为空")
	@Size(max=200)
	private String goodsName;

	private String goodsMainPicture;

	private String goodsOutline;

	private String goodsDesc;

	private String goodsCode;

	@NotNull(message = "marketPrice不能为空")
	@Digits(integer=10, fraction=2)
	private BigDecimal marketPrice;

	private Byte onSaleFlag;

	@NotNull(message = "marketPrice不能为空")
	@Digits(integer=10, fraction=2)
	private BigDecimal discountPrice;

	private String goodsTip;

	@Max(100000)
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

	private Byte recomFlag;

	private Date saleTime;

	private Integer visitNum;

	private Integer appraiseNum;

	private Integer awardIntegral;

	private Byte goodsStatus;

	private String illegalRemarks;

	private String createTime;

	private String updateTime;

	@Valid
	private List<GoodsSkuDTO> goodsSKUList;

	@Valid
	private List<GoodsAttr> goodsAttrs;

	private List<GoodsImgDTO> goodsImgList;
}
