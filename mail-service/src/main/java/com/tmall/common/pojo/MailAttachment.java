package com.tmall.common.pojo;

import java.util.Date;

public class MailAttachment {
    private Long attachmentId;

    private Integer mailId;

    private String attachmentFilename;

    private String dispFilename;

    private Double fileSize;

    private Date createTime;

    private Date updateTime;

    public Long getAttachmentId() {
        return attachmentId;
    }

    public void setAttachmentId(Long attachmentId) {
        this.attachmentId = attachmentId;
    }

    public Integer getMailId() {
        return mailId;
    }

    public void setMailId(Integer mailId) {
        this.mailId = mailId;
    }

    public String getAttachmentFilename() {
        return attachmentFilename;
    }

    public void setAttachmentFilename(String attachmentFilename) {
        this.attachmentFilename = attachmentFilename == null ? null : attachmentFilename.trim();
    }

    public String getDispFilename() {
        return dispFilename;
    }

    public void setDispFilename(String dispFilename) {
        this.dispFilename = dispFilename == null ? null : dispFilename.trim();
    }

    public Double getFileSize() {
        return fileSize;
    }

    public void setFileSize(Double fileSize) {
        this.fileSize = fileSize;
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
}