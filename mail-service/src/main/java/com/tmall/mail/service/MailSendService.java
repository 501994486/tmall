package com.tmall.mail.service;

import java.util.List;

public interface MailSendService {
	
	void sendSimpleTextMail(String from,String to, String subject, String content);
	
	void sendHtmlMail(String from,String to, String subject, String content);

	void sendInlineResourceMail(String from,String to, String subject, String content, String rscPath, String rscId);

	void sendAttachmentsMail(String from,String to, String subject, String content, List<String> filePathList);
	
	void sendEmailTemplate(String to, String subject, String name);

}
