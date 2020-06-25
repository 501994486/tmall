package com.tmall.schedule.entity;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.io.Serializable;

/**
 * 任务实体，存储每条任务的相关信息
 */
@Entity
@Table(name = "JOB_ENTITY")
@Data
@Accessors(chain = true)
public class JobEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;          //job名称
    private String jobGroup;      //job组名
    private String cron;          //执行的cron
    private String parameter;     //job的参数
    private String description;   //job描述信息
    private String vmParam;       //vm参数
    private String jarPath;       //job的jar路径
    private String status;        //job的执行状态,这里我设置为OPEN/CLOSE且只有该值为OPEN才会执行该Job
}
