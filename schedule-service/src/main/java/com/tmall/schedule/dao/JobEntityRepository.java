package com.tmall.schedule.dao;

import com.tmall.schedule.entity.JobEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobEntityRepository extends JpaRepository<JobEntity, Long> {

    JobEntity getById(Integer id);

}
