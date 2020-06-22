package com.tmall.mail.openservice;

import com.tmall.common.CommonLogic;
import com.tmall.common.dto.MailDeliveryDTO;
import com.tmall.mail.service.MailNoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.lang.reflect.InvocationTargetException;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 外部服务调用接口类
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
@Controller
@RequestMapping
public class MailOpenService {

	@Autowired
	private MailNoticeService mailNoticeService;

	@Autowired
	private HttpSession session;

	@RequestMapping(value="/send-mail",method = RequestMethod.GET)
	public boolean getMailNoticeByType(@RequestParam(value = "mailDeliveryDTO") MailDeliveryDTO mailDeliveryDTO) throws InvocationTargetException, IllegalAccessException {
		int shopId = CommonLogic.getShopId(session);
		return mailNoticeService.sendTextNoticeMail(mailDeliveryDTO);
	}
}
