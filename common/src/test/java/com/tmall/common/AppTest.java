package com.tmall.common;

import com.tmall.common.snowflakeId.SnowflakeIdWorker;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.Assert.assertTrue;

/**
 * Unit test for simple App.
 */
public class AppTest {
    @Autowired
    private SnowflakeIdWorker snowflakeIdWorker;
    /**
     * Rigorous Test :-)
     */
    @Test
    public void shouldAnswerWithTrue()
    {
        assertTrue( true );
    }
}
