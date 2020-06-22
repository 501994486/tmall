package com.tmall.common.dto;

import lombok.Data;

import java.util.List;

@Data
public class MailNoticeDTO {
	private String mailName;

	private Short mailType;

	private Byte returnAddressSameFlag;

	private String returnAddress;

	private String title;

	private Byte contentType;

	private String insertSentence;

	private String createTime;

	private String updateTime;

	private String contentText;

	private String contentHtml;

	private List<String> attachmentFileAddressList;
}
