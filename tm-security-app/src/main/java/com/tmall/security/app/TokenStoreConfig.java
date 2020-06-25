package com.tmall.security.app;

import com.tmall.security.app.jwt.TmallJwtTokenEnhancer;
import com.tmall.security.core.properties.SecurityProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import org.springframework.security.oauth2.provider.token.store.redis.RedisTokenStore;

@Configuration
public class TokenStoreConfig {

	@Autowired
	private RedisConnectionFactory redisConnectionFactory;

	@Bean
	@ConditionalOnProperty(prefix = "imooc.security.oauth2", name = "storeType", havingValue = "redis")
	public TokenStore redisTokenStore() {
		return new RedisTokenStore(redisConnectionFactory);
	}

	/**
	 * 当storeType为jwt，该配置项生效，不写也生效
	 */
	@Configuration
	@ConditionalOnProperty(prefix = "imooc.security.oauth2", name = "storeType", havingValue = "jwt", matchIfMissing = true)
	public static class JwtTokenConfig {

		@Autowired
		private SecurityProperties securityProperties;

		@Bean
		public TokenStore jwtTokenStore() {
			return new JwtTokenStore(jwtAccessTokenConverter());
		}

		/**
		 * token生成处理
		 * @return
		 */
		@Bean
		public JwtAccessTokenConverter jwtAccessTokenConverter() {
			JwtAccessTokenConverter accessTokenConverter = new JwtAccessTokenConverter();
			//用于签发
			accessTokenConverter.setSigningKey(securityProperties.getOauth2().getJwtSigningKey());
			return accessTokenConverter;
		}

		@Bean
		@ConditionalOnMissingBean(name = "imoocJwtTokenEnhancer")
		public TokenEnhancer imoocJwtTokenEnhancer() {
			return new TmallJwtTokenEnhancer();
		}

	}

}
