package com.tmall.domain.entity.valueobject;

import lombok.Data;

import java.util.Date;

@Data
public class GoodsCollect {
	private int id;
	private int spuId;
	private int userId;
	private Date collectTime;
}
