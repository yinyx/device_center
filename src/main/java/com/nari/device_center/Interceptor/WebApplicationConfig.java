package com.nari.device_center.Interceptor;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author yinyx
 * @version 1.0 2020/4/15
 */
@Configuration
public class WebApplicationConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/**").excludePathPatterns("/login",
//                "/software_tool/login",
//                "/user/login",
//                "/user/loginOut",
//                "/**/*.css",
//                "/**/*.js",
//                "/**/*.jpg",
//                "/**.*.png",
//                "/**/*.gif",
//                "/**/*.map");
        WebMvcConfigurer.super.addInterceptors(registry);
    }

}
