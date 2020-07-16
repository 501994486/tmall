项目简介：一个用于整合技术的商城系统
csdn博客地址:https://blog.csdn.net/qq_39403646/category_10204571.html
项目根目录 tmall

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