package com.tmall.order.application.service;


import com.tmall.order.domain.entity.Order;
import com.tmall.order.domain.entity.Stock;
import com.tmall.order.domain.entity.StockOrder;
import com.tmall.order.infrastructure.common.CacheKey;
import com.tmall.order.infrastructure.dao.OrderMapper;
import com.tmall.order.infrastructure.redis.RedisKeyUtil;
import com.tmall.order.infrastructure.redis.RedisService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class OrderServiceImpl implements OrderService {

    private static final Logger LOGGER = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Autowired
    private GoodsStockService stockService;

    @Autowired
    private OrderMapper orderMapper;

    @Resource
    private ValueOperations<String,Integer> valueOperations;

    @Autowired
    private RedisService redisService;

    /**
     * 创建订单
     * @param order
     * @return
     */
    @Override
    public boolean createOrder(Order order) {
        if(orderMapper.insertSelective(order) > 0 ){
            return true;
        }

        return false;
    }

    /**
     * 通过mq下订单
     * @param spuId
     * @param goodsStock
     * @param userId
     */
    @Override
    public void createOrderByMq(long spuId, int goodsStock,Integer userId){

        //校验库存
        int stock = stockService.getGoodsSpuStock((int)spuId);

        //乐观锁更新库存
        if (!stockService.updateStockByOptimistic(spuId,goodsStock)) {
            return;
        }

        // 令缓存中库存失效
        String key = RedisKeyUtil.getKeyWithColumn("spu","spuId",String.valueOf(spuId),"stock");
        redisService.deleteKey(key);

        //创建订单
        Order order = new Order();
        order.setUserId(userId);
        if(orderMapper.insertSelective(order) > 0){
            return;
        }

        String key2 = RedisKeyUtil.getKeyWithColumn("spu","spuId",String.valueOf(spuId),String.valueOf(userId));
        valueOperations.set(key,1);
    }

    /**
     * 检验用户是否已经购买过了
     * @param spuId
     * @param userId
     * @return
     */
    @Override
    public Boolean checkUserOrderInfoInCache(Integer spuId,Integer userId)  {
        String key = RedisKeyUtil.getKeyWithColumn("spu","spuId",String.valueOf(spuId),String.valueOf(userId));

        if(valueOperations.get(key) != null){
            return true;
        }
        return false;
    }

}
