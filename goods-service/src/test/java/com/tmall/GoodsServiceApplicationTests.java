package com.tmall;

import com.tmall.domain.entity.Category;
import com.tmall.infrastructure.dao.CategoryMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

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

	@Test
	public void testMysql() {
		Category categoryDB = categoryMapper.selectByPrimaryKey(1);
		System.out.println(categoryDB.toString());
	}
}
