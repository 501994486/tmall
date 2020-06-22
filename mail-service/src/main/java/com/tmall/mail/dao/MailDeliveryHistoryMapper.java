package com.tmall.mail.dao;

import com.tmall.mail.pojo.MailDeliveryHistory;

public interface MailDeliveryHistoryMapper {
    int deleteByPrimaryKey(Long messageId);

    int insert(MailDeliveryHistory record);

    int insertSelective(MailDeliveryHistory record);

    MailDeliveryHistory selectByPrimaryKey(Long messageId);

    int updateByPrimaryKeySelective(MailDeliveryHistory record);

    int updateByPrimaryKeyWithBLOBs(MailDeliveryHistory record);

    int updateByPrimaryKey(MailDeliveryHistory record);
}