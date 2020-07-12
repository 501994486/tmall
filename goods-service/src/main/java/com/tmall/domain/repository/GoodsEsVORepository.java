package com.tmall.domain.repository;

import com.tmall.infrastructure.vo.GoodsEsVO;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Component;

@Component
public interface  GoodsEsVORepository extends ElasticsearchRepository<GoodsEsVO,String> {

	GoodsEsVO queryGoodsEsVOById(String id);

}
