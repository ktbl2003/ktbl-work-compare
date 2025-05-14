/**
 * Copyright 2016-2030 this code originate from mgicode framework, using it under the below License
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.ktbl;


import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Slf4j
public class AuthFilter implements Filter {

    FilterConfig filterConfig;
    private List<String> excludes = new ArrayList<>();
    @Override
    public void init(final FilterConfig filterConfig) throws ServletException {
        this.filterConfig = filterConfig;
    }


    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        //要注意的是在使用 request.getParameter()，之后就破坏了流，后续处理会报错
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;

        corsFilter(req, resp, chain, null, "");

        //没有引用proxy jar，那么就直接走过虑了
        chain.doFilter(request, resp);

    }

    public static void corsFilter(ServletRequest req, ServletResponse res, FilterChain chain, List<String> corsWidthCredentialPaths, String path) {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        //  boolean needWidthCredential = AuthUtils.judge(path, corsWidthCredentialPaths);
        //log.debug("path:"+path+",corsWidthCredentialPaths:"+JSON.toJSONString(corsWidthCredentialPaths));
//        if (needWidthCredential) {
//            response.setHeader("Access-Control-Allow-Origin", ((HttpServletRequest) req).getHeader("origin"));
//            response.addHeader("Access-Control-Allow-Headers", "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,SessionToken");
//            // response.addHeader("Access-Control-Allow-Headers", "*");
//        } else {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
        // }
        response.setHeader("X-Frame-Options", "AllowAll");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Expose-Headers", "*");
        if (request.getMethod().equals("OPTIONS")) {
            response.setStatus(HttpStatus.OK.value());
            return;
        }
        if (request.getMethod().toLowerCase().equals("trace")) {
            response.setStatus(HttpStatus.METHOD_NOT_ALLOWED.value());
            return;
        }

        //  response.setHeader("Access-Control-Allow-Origin", "*");
        //  response.setHeader("Access-Control-Allow-Origin", ((HttpServletRequest) req).getHeader("origin"));
    }
}
