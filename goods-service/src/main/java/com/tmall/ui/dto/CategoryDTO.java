package com.tmall.ui.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Data
public class CategoryDTO {

	private Integer categoryId;

	private Integer parentCategoryId;

	@NotNull(message = "categoryName不能为空")
	@Size(max=200)
	private String categoryName;

	private Byte status;

	private BigDecimal commissionRate;

	private Byte showFlag;

	private String createTime;

	private String updateTime;

}
