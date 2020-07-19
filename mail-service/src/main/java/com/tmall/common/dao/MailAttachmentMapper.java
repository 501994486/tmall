package com.tmall.common.dao;

import com.tmall.common.pojo.MailAttachment;

public interface MailAttachmentMapper {
    int deleteByPrimaryKey(Long attachmentId);

    int insert(MailAttachment record);

    int insertSelective(MailAttachment record);

    MailAttachment selectByPrimaryKey(Long attachmentId);

    int updateByPrimaryKeySelective(MailAttachment record);

    int updateByPrimaryKey(MailAttachment record);
}