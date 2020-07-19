package com.tmall.common.dao;

import com.tmall.common.pojo.MailBasicSetup;

public interface MailBasicSetupMapper {
    int deleteByPrimaryKey(Integer shopId);

    int insert(MailBasicSetup record);

    int insertSelective(MailBasicSetup record);

    MailBasicSetup selectByPrimaryKey(Integer shopId);

    int updateByPrimaryKeySelective(MailBasicSetup record);

    int updateByPrimaryKeyWithBLOBs(MailBasicSetup record);

    int updateByPrimaryKey(MailBasicSetup record);
}