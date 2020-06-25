package com.tmall.mail.dao;

import com.tmall.mail.pojo.MailAttachment;

import java.util.List;

public interface MailAttachmentMapper {
    int deleteByPrimaryKey(Long attachmentId);

    int deleteByMailId(int mailId);

    int insert(MailAttachment record);

    int insertSelective(MailAttachment record);

    MailAttachment selectByPrimaryKey(Long attachmentId);

    List<MailAttachment> selectByMailId(int mailId);

    int updateByPrimaryKeySelective(MailAttachment record);

    int updateByPrimaryKey(MailAttachment record);
}