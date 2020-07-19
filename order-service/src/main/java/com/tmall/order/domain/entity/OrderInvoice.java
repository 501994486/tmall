package com.tmall.order.domain.entity;

import java.math.BigDecimal;
import java.util.Date;

public class OrderInvoice {
    private Integer invoiceId;

    private Long orderId;

    private Boolean isVat;

    private String invoiceTitle;

    private String invoiceContent;

    private BigDecimal invoiceAmount;

    private Integer invoiceTaxNo;

    private BigDecimal invoiceTax;

    private String vatCompanyName;

    private String vatCompanyAddress;

    private String vatTelphone;

    private String vatBankName;

    private String vatBankAccount;

    private Date createdTime;

    public Integer getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(Integer invoiceId) {
        this.invoiceId = invoiceId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Boolean getIsVat() {
        return isVat;
    }

    public void setIsVat(Boolean isVat) {
        this.isVat = isVat;
    }

    public String getInvoiceTitle() {
        return invoiceTitle;
    }

    public void setInvoiceTitle(String invoiceTitle) {
        this.invoiceTitle = invoiceTitle == null ? null : invoiceTitle.trim();
    }

    public String getInvoiceContent() {
        return invoiceContent;
    }

    public void setInvoiceContent(String invoiceContent) {
        this.invoiceContent = invoiceContent == null ? null : invoiceContent.trim();
    }

    public BigDecimal getInvoiceAmount() {
        return invoiceAmount;
    }

    public void setInvoiceAmount(BigDecimal invoiceAmount) {
        this.invoiceAmount = invoiceAmount;
    }

    public Integer getInvoiceTaxNo() {
        return invoiceTaxNo;
    }

    public void setInvoiceTaxNo(Integer invoiceTaxNo) {
        this.invoiceTaxNo = invoiceTaxNo;
    }

    public BigDecimal getInvoiceTax() {
        return invoiceTax;
    }

    public void setInvoiceTax(BigDecimal invoiceTax) {
        this.invoiceTax = invoiceTax;
    }

    public String getVatCompanyName() {
        return vatCompanyName;
    }

    public void setVatCompanyName(String vatCompanyName) {
        this.vatCompanyName = vatCompanyName == null ? null : vatCompanyName.trim();
    }

    public String getVatCompanyAddress() {
        return vatCompanyAddress;
    }

    public void setVatCompanyAddress(String vatCompanyAddress) {
        this.vatCompanyAddress = vatCompanyAddress == null ? null : vatCompanyAddress.trim();
    }

    public String getVatTelphone() {
        return vatTelphone;
    }

    public void setVatTelphone(String vatTelphone) {
        this.vatTelphone = vatTelphone == null ? null : vatTelphone.trim();
    }

    public String getVatBankName() {
        return vatBankName;
    }

    public void setVatBankName(String vatBankName) {
        this.vatBankName = vatBankName == null ? null : vatBankName.trim();
    }

    public String getVatBankAccount() {
        return vatBankAccount;
    }

    public void setVatBankAccount(String vatBankAccount) {
        this.vatBankAccount = vatBankAccount == null ? null : vatBankAccount.trim();
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }
}