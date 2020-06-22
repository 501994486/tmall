package com.tmall.infrastructure.feign;

import com.tmall.common.dto.MailDeliveryDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "mail-service",fallback = MailServiceHystric.class)
public interface MailService {

	@RequestMapping(value = "/tmall/send-mail",method = RequestMethod.GET)
	boolean sendNoticeMail(@RequestParam(value = "mailDeliveryDTO") MailDeliveryDTO mailDeliveryDTO);
}
