
package com.tmall.security.app;

import com.tmall.security.core.properties.OAuth2ClientProperties;
import com.tmall.security.core.properties.SecurityProperties;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.config.annotation.builders.InMemoryClientDetailsServiceBuilder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.security.oauth2.provider.token.TokenEnhancerChain;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;

import java.util.ArrayList;
import java.util.List;

/**
 * 认证服务器 spring默认实现，使用@EnableAuthorizationServer注解即可
 */
@Configuration
@EnableAuthorizationServer
public class TmallAuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private SecurityProperties securityProperties;

	@Autowired
	private TokenStore tokenStore;

	@Autowired(required = false)
	private TokenEnhancer imoocJwtTokenEnhancer;

	@Autowired(required = false)
	private JwtAccessTokenConverter jwtAccessTokenConverter;

	/**
	 * 配置切入点信息
	 * @param endpoints
	 * @throws Exception
	 */
	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
		endpoints
				.tokenStore(tokenStore) //TokenStoreConfig配置的tokenStore
				.authenticationManager(authenticationManager).userDetailsService(userDetailsService);
		if (jwtAccessTokenConverter != null && imoocJwtTokenEnhancer != null) {
			TokenEnhancerChain enhancerChain = new TokenEnhancerChain();
			List<TokenEnhancer> enhancerList = new ArrayList<>();//用于连接两个增强器
			enhancerList.add(imoocJwtTokenEnhancer);
			enhancerList.add(jwtAccessTokenConverter);
			enhancerChain.setTokenEnhancers(enhancerList);

			endpoints
					.tokenEnhancer(enhancerChain)
					.accessTokenConverter(jwtAccessTokenConverter);
		}
	}

	/**
	 * 客户端(第三方应用)相关配置
	 * @param clients
	 * @throws Exception
	 */
	@Override
	public void configure(ClientDetailsServiceConfigurer clients) throws Exception {

		InMemoryClientDetailsServiceBuilder builder = clients.inMemory();
		if (ArrayUtils.isNotEmpty(securityProperties.getOauth2().getClients())) {
			for (OAuth2ClientProperties config : securityProperties.getOauth2().getClients()) {
				builder.withClient(config.getClientId())
						.secret(config.getClientSecret())
						.accessTokenValiditySeconds(config.getAccessTokenValidateSeconds())
						.authorizedGrantTypes("refresh_token", "password", "authorization_code")//支持的授权模式
						.scopes("all", "read", "write")
						.refreshTokenValiditySeconds(60 * 60 * 24 * 30);
						//.withClient("xxx"); //增加client
			}
		}

	}
}
