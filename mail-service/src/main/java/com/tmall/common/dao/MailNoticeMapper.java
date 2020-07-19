package com.tmall.common.dao;

import com.tmall.common.pojo.MailNotice;

public interface MailNoticeMapper {
    int deleteByPrimaryKey(Integer mailId);

    int insert(MailNotice record);

    int insertSelective(MailNotice record);

    MailNotice selectByPrimaryKey(Integer mailId);

    int updateByPrimaryKeySelective(MailNotice record);

    int updateByPrimaryKeyWithBLOBs(MailNotice record);

    int updateByPrimaryKey(MailNotice record);
}