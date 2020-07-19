package com.tmall.order.domain.entity;

import java.math.BigDecimal;
import java.util.Date;

public class OrderLogistics {
    private Integer orderlogisticsId;

    private Long orderId;

    private String expressNo;

    private String consigneeRealname;

    private String consigneeTelphone;

    private String consigneeAddress;

    private String consigneeZip;

    private String logisticsType;

    private Integer logisticsId;

    private Integer logisticsFee;

    private BigDecimal agencyFee;

    private BigDecimal deliveryAmount;

    private Byte orderlogisticsStatus;

    private Byte logisticsSettlementStatus;

    private String logisticsResultLast;

    private String logisticsDesc;

    private Date logisticsCreateTime;

    private Date logisticsUpdateTime;

    private Date logisticsSettlementTime;

    private String payChannel;

    private String paymentOrderNo;

    private Byte reconciliationStatus;

    private Date reconciliationTime;

    public Integer getOrderlogisticsId() {
        return orderlogisticsId;
    }

    public void setOrderlogisticsId(Integer orderlogisticsId) {
        this.orderlogisticsId = orderlogisticsId;
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

    public String getConsigneeTelphone() {
        return consigneeTelphone;
    }

    public void setConsigneeTelphone(String consigneeTelphone) {
        this.consigneeTelphone = consigneeTelphone == null ? null : consigneeTelphone.trim();
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

    public Integer getLogisticsFee() {
        return logisticsFee;
    }

    public void setLogisticsFee(Integer logisticsFee) {
        this.logisticsFee = logisticsFee;
    }

    public BigDecimal getAgencyFee() {
        return agencyFee;
    }

    public void setAgencyFee(BigDecimal agencyFee) {
        this.agencyFee = agencyFee;
    }

    public BigDecimal getDeliveryAmount() {
        return deliveryAmount;
    }

    public void setDeliveryAmount(BigDecimal deliveryAmount) {
        this.deliveryAmount = deliveryAmount;
    }

    public Byte getOrderlogisticsStatus() {
        return orderlogisticsStatus;
    }

    public void setOrderlogisticsStatus(Byte orderlogisticsStatus) {
        this.orderlogisticsStatus = orderlogisticsStatus;
    }

    public Byte getLogisticsSettlementStatus() {
        return logisticsSettlementStatus;
    }

    public void setLogisticsSettlementStatus(Byte logisticsSettlementStatus) {
        this.logisticsSettlementStatus = logisticsSettlementStatus;
    }

    public String getLogisticsResultLast() {
        return logisticsResultLast;
    }

    public void setLogisticsResultLast(String logisticsResultLast) {
        this.logisticsResultLast = logisticsResultLast == null ? null : logisticsResultLast.trim();
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

    public Date getLogisticsSettlementTime() {
        return logisticsSettlementTime;
    }

    public void setLogisticsSettlementTime(Date logisticsSettlementTime) {
        this.logisticsSettlementTime = logisticsSettlementTime;
    }

    public String getPayChannel() {
        return payChannel;
    }

    public void setPayChannel(String payChannel) {
        this.payChannel = payChannel == null ? null : payChannel.trim();
    }

    public String getPaymentOrderNo() {
        return paymentOrderNo;
    }

    public void setPaymentOrderNo(String paymentOrderNo) {
        this.paymentOrderNo = paymentOrderNo == null ? null : paymentOrderNo.trim();
    }

    public Byte getReconciliationStatus() {
        return reconciliationStatus;
    }

    public void setReconciliationStatus(Byte reconciliationStatus) {
        this.reconciliationStatus = reconciliationStatus;
    }

    public Date getReconciliationTime() {
        return reconciliationTime;
    }

    public void setReconciliationTime(Date reconciliationTime) {
        this.reconciliationTime = reconciliationTime;
    }
}