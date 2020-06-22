package com.tmall;

import com.tmall.domain.entity.Category;
import com.tmall.domain.entity.Goods;
import com.tmall.infrastructure.dao.CategoryMapper;
import com.tmall.common.snowflakeId.SnowflakeIdWorker;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import java.math.BigDecimal;
import java.util.Date;

@RunWith(SpringRunner.class)
@SpringBootTest
@MapperScan("com.tmall.infrastructure.dao")
public class GoodsServiceApplicationTests {

	@Test
	public void hello() {
		System.out.println("hello world");
	}

	@Autowired
	private CategoryMapper categoryMapper;

	@Autowired
	private SnowflakeIdWorker snowflakeIdWorker;

	@Test
	public void testMysqlSelect() {
		Category categoryDB = categoryMapper.selectByPrimaryKey(9);
		System.out.println(categoryDB.toString());
	}

	@Test
	public void testMysqlInsert() {
		Category categoryDB = new Category();
		categoryDB.setCategoryId(11);
		categoryDB.setCategoryName("99");
		categoryDB.setParentCategoryId(10);
		categoryDB.setShopId(99);
		categoryDB.setStatus((byte)1);
		categoryDB.setShowFlag((byte)1);
		categoryDB.setDeleteFlag((byte)1);
		categoryDB.setUpdateTime(new Date());
		categoryDB.setCreateTime(new Date());
		categoryDB.setCommissionRate(new BigDecimal(-1.00));
		categoryDB.setSortOrder(1);
		categoryMapper.insert(categoryDB);
	}
	@Autowired
	private ElasticsearchTemplate elasticsearchTemplate;

	@Test
	public void testCreateIndex() {
		System.out.println("1");
		elasticsearchTemplate.createIndex(Goods.class);
	}

	@Test
	public void testDeleteIndex() {
		System.out.println("1");
		elasticsearchTemplate.deleteIndex(Goods.class);
	}

	@Test
	public void testSnowId() {
		System.out.println(snowflakeIdWorker.nextId());;
	}
}
