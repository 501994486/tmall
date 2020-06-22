package com.tmall.mail.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class MailNotice {

    private Integer mailId;

    private Integer shopId;

    private Short mailType;

    private String mailName;

    private Boolean returnAddressSameFlag;

    private String returnAddress;

    private String title;

    private Byte contentType;

    private String insertSentence;

    private Date createTime;

    private Date updateTime;

    private String contentText;

    private String contentHtml;

}