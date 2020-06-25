package com.tmall.infrastructure.vo;

import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.metadata.BaseRowModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoodsVO extends BaseRowModel {
    @ExcelProperty(value = "商品名" ,index = 0)
    private String goodsName;

    @ExcelProperty(value = "概要",index = 1)
    private String goodsOutline;

    @ExcelProperty(value = "详细",index = 2)
    private String goodsDesc;

    @ExcelProperty(value = "代码",index = 3)
    private String goodsCode;

    @ExcelProperty(value = "市场价",index = 4)
    private BigDecimal marketPrice;

    @ExcelProperty(value = "折扣价",index = 5)
    private BigDecimal discountPrice;

    @ExcelProperty(value = "折扣价",index = 6)
    private String goodsTip;

    @ExcelProperty(value = "商品库存",index = 7)
    private Integer goodStock;

    @ExcelProperty(value = "折扣价",index = 8)
    private String stockUnit;

}