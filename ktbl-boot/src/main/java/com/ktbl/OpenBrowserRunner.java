package com.ktbl;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OpenBrowserRunner implements CommandLineRunner {

    @Value("${server.port}")
    private int serverPort;

//    @Value("${ktbl.contextPath}")
    private String contextPath="/";

    @Override
    public void run(String... args) throws Exception {
        String url = "http://localhost:" + serverPort + contextPath;
        System.out.println("自动打开浏览器访问: " + url);
        openBrowser(url);
    }

    private void openBrowser(String url) {
        try {
            // Windows系统
            if (System.getProperty("os.name").contains("Windows")) {
                Runtime.getRuntime().exec("rundll32 url.dll,FileProtocolHandler " + url);
            }
            // macOS系统
            else if (System.getProperty("os.name").contains("Mac")) {
                Runtime.getRuntime().exec("open " + url);
            }
            // Linux系统
            else {
                Runtime.getRuntime().exec("xdg-open " + url);
            }
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("无法打开浏览器, 请手动访问: " + url);
        }
    }
}
