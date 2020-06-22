package com.tmall.infrastructure.feign;

import com.tmall.common.dto.MailDeliveryDTO;
import org.springframework.stereotype.Component;

@Component
public class MailServiceHystric implements MailService {

	public boolean sendNoticeMail(MailDeliveryDTO mailDeliveryDTO){

		return false;
	}
}
