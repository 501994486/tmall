package com.tmall.mail.service;

import com.tmall.common.AppConstants;
import com.tmall.common.dto.MailDeliveryDTO;
import com.tmall.common.dto.MailNoticeDTO;
import com.tmall.common.utils.DateTimeUtils;
import com.tmall.mail.common.MailContants;
import com.tmall.mail.dao.MailAttachmentMapper;
import com.tmall.mail.dao.MailBasicSetupMapper;
import com.tmall.mail.dao.MailNoticeMapper;
import com.tmall.mail.pojo.MailAttachment;
import com.tmall.mail.pojo.MailBasicSetup;
import com.tmall.mail.pojo.MailNotice;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.lang.reflect.InvocationTargetException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;


@Service
public class MailNoticeServiceImpl implements MailNoticeService{

	@Autowired
	private MailNoticeMapper mailNoticeMapper;

	@Autowired
	private MailAttachmentMapper mailAttachmentMapper;

	@Autowired
	private MailBasicSetupMapper mailBasicSetupMapper;

	@Autowired
	private MailSendService mailSendService;

	@Override
	public MailNoticeDTO getNoticeMailByMailType(int shopId, byte mailType) throws InvocationTargetException, IllegalAccessException {
		MailNoticeDTO mailNoticeDTO = new MailNoticeDTO();

		MailNotice noticemailDB = mailNoticeMapper.selectByMailType(shopId,mailType);
		BeanUtils.copyProperties(mailNoticeDTO,noticemailDB);

		List<MailAttachment> mailAttachmentListDB = mailAttachmentMapper.selectByMailId(noticemailDB.getMailId());
		List<String> attachmentFileAddressList = new ArrayList<>();
		if (CollectionUtils.isNotEmpty(mailAttachmentListDB)) {
			for (MailAttachment mailAttachmentDB : mailAttachmentListDB) {
				attachmentFileAddressList.add(mailAttachmentDB.getAttachmentId() + AppConstants.SYMBOL_SLASH + mailAttachmentDB.getDispFilename() + AppConstants.SYMBOL_SLASH + mailAttachmentDB.getFileSize());
			}
		}
		mailNoticeDTO.setAttachmentFileAddressList(attachmentFileAddressList);

		return mailNoticeDTO;
	}
	
	@Override
	public boolean updateNoticeMail(int mailId,int shopId,MailNoticeDTO mailNoticeDTO) throws InvocationTargetException, IllegalAccessException {

		MailNotice mailNotice = new MailNotice();
		BeanUtils.copyProperties(mailNotice,mailNoticeDTO);

		Timestamp currentTime = DateTimeUtils.getCurrentTimestamp();
		mailNotice.setUpdateTime(currentTime);
		mailNotice.setMailId(mailId);
		mailNotice.setShopId(shopId);

		List<String> attachmentFileAddressList = mailNoticeDTO.getAttachmentFileAddressList();
		MailAttachment mailAttachment = new MailAttachment();
		mailAttachment.setCreateTime(currentTime);
		mailAttachment.setUpdateTime(currentTime);
		mailAttachment.setMailId(mailId);
		mailAttachmentMapper.deleteByMailId(mailId);
		for(String attachmentFileAddress : attachmentFileAddressList){
			mailAttachment.setAttachmentId(Long.parseLong(attachmentFileAddress.split(AppConstants.SYMBOL_SLASH)[0]));
			mailAttachment.setAttachmentFilename(attachmentFileAddress.split(AppConstants.SYMBOL_SLASH)[1]);
			mailAttachment.setDispFilename(attachmentFileAddress.split(AppConstants.SYMBOL_SLASH)[1]);
			mailAttachment.setFileSize(Double.parseDouble(attachmentFileAddress.split(AppConstants.SYMBOL_SLASH)[2]));
			mailAttachmentMapper.insert(mailAttachment);
		}

		return true;
	}
	
	// 送信信息表示
	@Override
	public MailDeliveryDTO getTestMailData(int mailId,int shopId,MailNoticeDTO mailNoticeDTO){
		MailBasicSetup mailBasicSetupDB = mailBasicSetupMapper.selectByPrimaryKey(shopId);

		MailDeliveryDTO mailDeliveryDTO = new MailDeliveryDTO();
		mailDeliveryDTO.setMailTitle(mailNoticeDTO.getMailName());

		if(mailNoticeDTO.getContentType() == MailContants.MAIL_CONTENT_TYPE_TEXT){
			mailDeliveryDTO.setMailBody(mailNoticeDTO.getContentText());
		} else {
			mailDeliveryDTO.setMailBody(mailNoticeDTO.getContentHtml());
		}

		if(mailNoticeDTO.getReturnAddressSameFlag() == AppConstants.SAME_FLAG_YES){
			mailDeliveryDTO.setReturnAddress(mailBasicSetupDB.getReturnAddress());
		} else {
			mailDeliveryDTO.setReturnAddress(mailNoticeDTO.getReturnAddress());
		}

		List<MailAttachment> mailAttachmentListDB = mailAttachmentMapper.selectByMailId(mailId);
		List<String> attachmentFileAddressList = new ArrayList<>();
		if (CollectionUtils.isNotEmpty(mailAttachmentListDB)) {
			for (MailAttachment mailAttachmentDB : mailAttachmentListDB) {
				attachmentFileAddressList.add(mailAttachmentDB.getAttachmentId() + AppConstants.SYMBOL_SLASH + mailAttachmentDB.getDispFilename());
			}
		}
		mailNoticeDTO.setAttachmentFileAddressList(attachmentFileAddressList);
		return mailDeliveryDTO;
	}
	
	
	@Override
	public boolean sendTextNoticeMail(MailDeliveryDTO mailDeliveryDTO) {

		if (StringUtils.isEmpty(mailDeliveryDTO.getReturnAddress()) ||
				StringUtils.isEmpty(mailDeliveryDTO.getSendAddress())) {
			return false;
		}

		if(CollectionUtils.isNotEmpty(mailDeliveryDTO.getAttachmentFileAddressList())){
			mailSendService.sendAttachmentsMail(mailDeliveryDTO.getReturnAddress(),mailDeliveryDTO.getSendAddress(),mailDeliveryDTO.getMailTitle(),mailDeliveryDTO.getMailBody(),mailDeliveryDTO.getAttachmentFileAddressList());
		} else{
			mailSendService.sendHtmlMail(mailDeliveryDTO.getReturnAddress(),mailDeliveryDTO.getSendAddress(),mailDeliveryDTO.getMailTitle(),mailDeliveryDTO.getMailBody());
		}

		return true;
	}

}
