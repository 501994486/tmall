package com.tmall.order.domain.entity;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
public class Order {
    private Long orderId;

    private Integer shopId;

    private Byte orderStatus;

    private BigDecimal productPrice;

    private BigDecimal orderPrice;

    private BigDecimal logisticsFee;

    private Boolean isUnpackingInspection;

    private Integer invoiceId;

    private Integer addressId;

    private Integer logisticsId;

    private String payChannel;

    private String escrowTradeNo;

    private Date createDate;

    private Date paymentDate;

    private Date shipDate;

    private Byte orderSettlementStatus;

    private Integer orderSettlementTime;

    private Integer userId;

    private String userRemark;

    private Date modifyDate;

    private List<OrderDetail> orderDetailList;

}