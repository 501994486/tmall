package com.tmall.mail.dao;

import com.tmall.mail.pojo.MailNotice;
import org.apache.ibatis.annotations.Param;

public interface MailNoticeMapper {
    int deleteByPrimaryKey(@Param("shopId") Integer shopId, @Param("mailType") Short mailType);

    int insert(MailNotice record);

    int insertSelective(MailNotice record);

    MailNotice selectByPrimaryKey(int mailId);

    MailNotice selectByMailType(@Param("shopId") Integer shopId, @Param("mailType") Byte mailType);

    int updateByPrimaryKeySelective(MailNotice record);

    int updateByPrimaryKeyWithBLOBs(MailNotice record);

    int updateByPrimaryKey(MailNotice record);
}