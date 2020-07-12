package com.tmall.mail.dao;

import com.tmall.mail.pojo.MailNotice;
import org.apache.ibatis.annotations.Param;

public interface MailNoticeMapper {

    /**
     * 返回自增主键的id值
     * @param record
     * @return
     */
    int insert(MailNotice record);

    MailNotice selectByPrimaryKey(int mailId);

    MailNotice selectByMailType(@Param("shopId") Integer shopId, @Param("mailType") Byte mailType);

    int updateByPrimaryKeySelective(MailNotice record);

    int updateByPrimaryKeyWithBLOBs(MailNotice record);

    int updateByPrimaryKey(MailNotice record);
}