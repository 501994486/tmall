package com.tmall.order.application.service;

import com.alipay.api.AlipayApiException;
import com.tmall.order.infrastructure.alipay.Alipay;
import com.tmall.order.infrastructure.alipay.AlipayBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PayServiceImpl implements PayService {

	@Autowired
	private Alipay alipay;

	@Override
	public String aliPay(AlipayBean alipayBean) throws AlipayApiException {
		return alipay.pay(alipayBean);
	}

}
