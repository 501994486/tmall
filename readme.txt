项目简介：一个用于整合技术的商城系统(只包含后端代码)
csdn博客地址:https://blog.csdn.net/qq_39403646/category_10204571.html
项目根目录 tmall

功能列表
✔ 系统登录：系统用户登录，系统登录认证（token方式）
✔ 第三方登录：集成第三方登录功能（QQ、微信）
✔ 系统日志：记录用户操作日志，查看系统执行日志记录
✔ 数据监控：定制Druid信息，提供简洁有效的SQL监控
✔ 服务治理：集成Eureka注册中心，实现服务注册和发现
✔ 服务监控：集成Spring Boot Admin，实现服务监控
✔ 服务消费：集成Feign，服务调用和负载均衡
✔ 服务熔断：集成Hystrix、Turbine，实现熔断和监控
✔ 服务网关：集成Spring Cloud gateway，实现API网关
✔ 链路追踪：集成Sleuth、Zipkin，实现分布式链路追踪
✔ 配置中心：集成Config、Bus，实现分布式配置中心
✔ 商品服务：实现了商品spu、sku的增删改查，收藏、全文检索等功能
✔ 订单服务：异步订单、阿里支付、乐观锁订单、库存查询等功能
✔ 邮件服务：定时发送邮件，异步邮件、邮件履历管理等功能
✔ 事务服务：rabbitmq分布式事务的实现
✔ 日程服务：定时服务的实现
✘ 用户管理：新建用户，修改用户，删除用户，查询用户
✘ 单点登录：利用 OAuth2, 提供统一的单点登录功能


启动步骤:
1.启动两台虚拟主机 192.168.6.130/192.168.6.131
2.启动mysql(已设置自动启动)
3.启动redis : ./usr/local/redis/bin/redis-cli
4.启动elasticearch
su elasticsearch
./usr/local/elasticsearch-6.1.1/bin/elasticsearch
5.启动rabbitmq
sudo /sbin/service rabbitmq-server start
管理工具：http://192.168.6.130:15672/
6.启动nginx
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
7.启动FastDFS
启动tracker命令：/etc/init.d/fdfs_trackerd start
启动storage命令：/etc/init.d/fdfs_storaged start

分支说明
master: 主推版本分支
dev: 开发分支，适时合并到master分支
feature: 开发新功能分支，开发成功后合并到dev
bug: 用于修改系统中产生的bug，测试成功后合并到dev


