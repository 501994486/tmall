package com.tmall.infrastructure.vo;

import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.metadata.BaseRowModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Builder
@AllArgsConstructor
@Data
public class GoodsHotVo extends BaseRowModel {
    private Long spuId;

    private String goodsName;

    private String goodsMainPicture;

    private String goodsCode;

    private int spuSaleNum;

}