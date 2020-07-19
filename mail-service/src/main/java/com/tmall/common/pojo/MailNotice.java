package com.tmall.common.pojo;

import java.util.Date;

public class MailNotice {
    private Integer mailId;

    private Integer shopId;

    private String mailName;

    private Short mailType;

    private Boolean returnAddressSameFlag;

    private String returnAddress;

    private String title;

    private Byte contentType;

    private String insertSentence;

    private Date createTime;

    private Date updateTime;

    private String contentText;

    private String contentHtml;

    public Integer getMailId() {
        return mailId;
    }

    public void setMailId(Integer mailId) {
        this.mailId = mailId;
    }

    public Integer getShopId() {
        return shopId;
    }

    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }

    public String getMailName() {
        return mailName;
    }

    public void setMailName(String mailName) {
        this.mailName = mailName == null ? null : mailName.trim();
    }

    public Short getMailType() {
        return mailType;
    }

    public void setMailType(Short mailType) {
        this.mailType = mailType;
    }

    public Boolean getReturnAddressSameFlag() {
        return returnAddressSameFlag;
    }

    public void setReturnAddressSameFlag(Boolean returnAddressSameFlag) {
        this.returnAddressSameFlag = returnAddressSameFlag;
    }

    public String getReturnAddress() {
        return returnAddress;
    }

    public void setReturnAddress(String returnAddress) {
        this.returnAddress = returnAddress == null ? null : returnAddress.trim();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public Byte getContentType() {
        return contentType;
    }

    public void setContentType(Byte contentType) {
        this.contentType = contentType;
    }

    public String getInsertSentence() {
        return insertSentence;
    }

    public void setInsertSentence(String insertSentence) {
        this.insertSentence = insertSentence == null ? null : insertSentence.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getContentText() {
        return contentText;
    }

    public void setContentText(String contentText) {
        this.contentText = contentText == null ? null : contentText.trim();
    }

    public String getContentHtml() {
        return contentHtml;
    }

    public void setContentHtml(String contentHtml) {
        this.contentHtml = contentHtml == null ? null : contentHtml.trim();
    }
}