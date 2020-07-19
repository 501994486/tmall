package com.tmall.common.pojo;

import java.util.Date;

public class MailDeliveryHistory {
    private Long messageId;

    private Integer shopId;

    private Integer mailId;

    private String title;

    private String recipientMail;

    private Integer recipientUserId;

    private String senderMail;

    private Integer senderUserId;

    private Date deliveryDate;

    private Byte deliveryStatus;

    private Byte mailBodyType;

    private Short mailType;

    private String mailTypeName;

    private String mailBodyProcessed;

    public Long getMessageId() {
        return messageId;
    }

    public void setMessageId(Long messageId) {
        this.messageId = messageId;
    }

    public Integer getShopId() {
        return shopId;
    }

    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }

    public Integer getMailId() {
        return mailId;
    }

    public void setMailId(Integer mailId) {
        this.mailId = mailId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getRecipientMail() {
        return recipientMail;
    }

    public void setRecipientMail(String recipientMail) {
        this.recipientMail = recipientMail == null ? null : recipientMail.trim();
    }

    public Integer getRecipientUserId() {
        return recipientUserId;
    }

    public void setRecipientUserId(Integer recipientUserId) {
        this.recipientUserId = recipientUserId;
    }

    public String getSenderMail() {
        return senderMail;
    }

    public void setSenderMail(String senderMail) {
        this.senderMail = senderMail == null ? null : senderMail.trim();
    }

    public Integer getSenderUserId() {
        return senderUserId;
    }

    public void setSenderUserId(Integer senderUserId) {
        this.senderUserId = senderUserId;
    }

    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public Byte getDeliveryStatus() {
        return deliveryStatus;
    }

    public void setDeliveryStatus(Byte deliveryStatus) {
        this.deliveryStatus = deliveryStatus;
    }

    public Byte getMailBodyType() {
        return mailBodyType;
    }

    public void setMailBodyType(Byte mailBodyType) {
        this.mailBodyType = mailBodyType;
    }

    public Short getMailType() {
        return mailType;
    }

    public void setMailType(Short mailType) {
        this.mailType = mailType;
    }

    public String getMailTypeName() {
        return mailTypeName;
    }

    public void setMailTypeName(String mailTypeName) {
        this.mailTypeName = mailTypeName == null ? null : mailTypeName.trim();
    }

    public String getMailBodyProcessed() {
        return mailBodyProcessed;
    }

    public void setMailBodyProcessed(String mailBodyProcessed) {
        this.mailBodyProcessed = mailBodyProcessed == null ? null : mailBodyProcessed.trim();
    }
}