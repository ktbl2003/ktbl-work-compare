package com.ktbl;


import jakarta.servlet.MultipartConfigElement;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.web.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.util.unit.DataSize;

@SpringBootApplication(scanBasePackages = {"com.ktbl"})
//@SpringBootApplication( exclude = {DataSourceAutoConfiguration.class, DruidDataSourceAutoConfigure.class, HibernateJpaAutoConfiguration.class})
@Configuration
@EnableCaching
@EnableAsync
@ConfigurationPropertiesScan
public class MainApplication {

    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(MainApplication.class);
        application.run(args);
        System.out.println("ヾ(◍°∇°◍)ﾉﾞ    启动成功      ヾ(◍°∇°◍)ﾉﾞ");

    }
    @Value("${com.ktbl.auth.paths:}")
    private String[] authPaths;
    @Bean("AuthFilter01")
    public FilterRegistrationBean<AuthFilter> authFilterRegistration() {
        FilterRegistrationBean<AuthFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(new AuthFilter());
        registration.addUrlPatterns(authPaths);//配置过滤路径
      //  registration.addInitParameter("loginPage", "/admin/login.jsp");//添加初始值
        registration.addInitParameter("exclusions", "*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*");
        registration.setName("AuthFilter");//设置filter名称
        registration.setOrder(Integer.MIN_VALUE + 3);//请求中过滤器执行的先后顺序，值越小越先执行
        return registration;
    }

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        // 设置单个文件大小限制
        factory.setMaxFileSize(DataSize.ofMegabytes(100));
        // 设置总请求大小限制
        factory.setMaxRequestSize(DataSize.ofMegabytes(100));
        return factory.createMultipartConfig();
    }

//    @Bean
//    public TomcatServletWebServerFactory tomcatEmbedded() {
//        TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory();
//        tomcat.addConnectorCustomizers((TomcatConnectorCustomizer) connector -> {
//            // 设置最大POST请求大小
//            ((AbstractHttp11Protocol<?>) connector.getProtocolHandler()).setMaxSwallowSize(-1);
//        });
//        return tomcat;
//    }

}
