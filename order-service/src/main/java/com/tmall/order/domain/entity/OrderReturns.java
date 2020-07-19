package com.tmall.order.domain.entity;

import java.math.BigDecimal;
import java.util.Date;

public class OrderReturns {
    private Integer orderReturnsId;

    private Long orderId;

    private String expressNo;

    private String consigneeRealname;

    private String consigneeTelephone;

    private String consigneeAddress;

    private String consigneeZip;

    private String logisticsType;

    private Integer logisticsId;

    private BigDecimal logisticsFee;

    private Byte orderlogisticsStatus;

    private String logisticsDescLast;

    private String logisticsDesc;

    private Date logisticsCreateTime;

    private Date logisticsUpdateTime;

    private Byte returnsType;

    private Byte handlingWay;

    private BigDecimal returnsPrice;

    private Date returnSubmitTime;

    private Date handlingTime;

    private String returnReason;

    public Integer getOrderReturnsId() {
        return orderReturnsId;
    }

    public void setOrderReturnsId(Integer orderReturnsId) {
        this.orderReturnsId = orderReturnsId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getExpressNo() {
        return expressNo;
    }

    public void setExpressNo(String expressNo) {
        this.expressNo = expressNo == null ? null : expressNo.trim();
    }

    public String getConsigneeRealname() {
        return consigneeRealname;
    }

    public void setConsigneeRealname(String consigneeRealname) {
        this.consigneeRealname = consigneeRealname == null ? null : consigneeRealname.trim();
    }

    public String getConsigneeTelephone() {
        return consigneeTelephone;
    }

    public void setConsigneeTelephone(String consigneeTelephone) {
        this.consigneeTelephone = consigneeTelephone == null ? null : consigneeTelephone.trim();
    }

    public String getConsigneeAddress() {
        return consigneeAddress;
    }

    public void setConsigneeAddress(String consigneeAddress) {
        this.consigneeAddress = consigneeAddress == null ? null : consigneeAddress.trim();
    }

    public String getConsigneeZip() {
        return consigneeZip;
    }

    public void setConsigneeZip(String consigneeZip) {
        this.consigneeZip = consigneeZip == null ? null : consigneeZip.trim();
    }

    public String getLogisticsType() {
        return logisticsType;
    }

    public void setLogisticsType(String logisticsType) {
        this.logisticsType = logisticsType == null ? null : logisticsType.trim();
    }

    public Integer getLogisticsId() {
        return logisticsId;
    }

    public void setLogisticsId(Integer logisticsId) {
        this.logisticsId = logisticsId;
    }

    public BigDecimal getLogisticsFee() {
        return logisticsFee;
    }

    public void setLogisticsFee(BigDecimal logisticsFee) {
        this.logisticsFee = logisticsFee;
    }

    public Byte getOrderlogisticsStatus() {
        return orderlogisticsStatus;
    }

    public void setOrderlogisticsStatus(Byte orderlogisticsStatus) {
        this.orderlogisticsStatus = orderlogisticsStatus;
    }

    public String getLogisticsDescLast() {
        return logisticsDescLast;
    }

    public void setLogisticsDescLast(String logisticsDescLast) {
        this.logisticsDescLast = logisticsDescLast == null ? null : logisticsDescLast.trim();
    }

    public String getLogisticsDesc() {
        return logisticsDesc;
    }

    public void setLogisticsDesc(String logisticsDesc) {
        this.logisticsDesc = logisticsDesc == null ? null : logisticsDesc.trim();
    }

    public Date getLogisticsCreateTime() {
        return logisticsCreateTime;
    }

    public void setLogisticsCreateTime(Date logisticsCreateTime) {
        this.logisticsCreateTime = logisticsCreateTime;
    }

    public Date getLogisticsUpdateTime() {
        return logisticsUpdateTime;
    }

    public void setLogisticsUpdateTime(Date logisticsUpdateTime) {
        this.logisticsUpdateTime = logisticsUpdateTime;
    }

    public Byte getReturnsType() {
        return returnsType;
    }

    public void setReturnsType(Byte returnsType) {
        this.returnsType = returnsType;
    }

    public Byte getHandlingWay() {
        return handlingWay;
    }

    public void setHandlingWay(Byte handlingWay) {
        this.handlingWay = handlingWay;
    }

    public BigDecimal getReturnsPrice() {
        return returnsPrice;
    }

    public void setReturnsPrice(BigDecimal returnsPrice) {
        this.returnsPrice = returnsPrice;
    }

    public Date getReturnSubmitTime() {
        return returnSubmitTime;
    }

    public void setReturnSubmitTime(Date returnSubmitTime) {
        this.returnSubmitTime = returnSubmitTime;
    }

    public Date getHandlingTime() {
        return handlingTime;
    }

    public void setHandlingTime(Date handlingTime) {
        this.handlingTime = handlingTime;
    }

    public String getReturnReason() {
        return returnReason;
    }

    public void setReturnReason(String returnReason) {
        this.returnReason = returnReason == null ? null : returnReason.trim();
    }
}