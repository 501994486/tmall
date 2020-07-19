package com.tmall.common.dto;

import lombok.Data;

@Data
public class GoodsStock {
	private long spuId;
	private int goodsStock;
	private int spuSaleNum;
	private int userId;
}
