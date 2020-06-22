package com.tmall.mail.service;

import com.tmall.common.dto.MailDeliveryDTO;
import com.tmall.common.dto.MailNoticeDTO;

import java.lang.reflect.InvocationTargetException;

public interface MailNoticeService {

	MailNoticeDTO getNoticeMailByMailType(int shopId,byte mailType)throws InvocationTargetException, IllegalAccessException;

	boolean updateNoticeMail(int mailId,int shopId,MailNoticeDTO mailNoticeDTO)throws InvocationTargetException, IllegalAccessException;

	MailDeliveryDTO getTestMailData(int mailId,int shopId,MailNoticeDTO mailNoticeDTO);

	boolean sendTextNoticeMail(MailDeliveryDTO mailDeliveryDTO);
}
