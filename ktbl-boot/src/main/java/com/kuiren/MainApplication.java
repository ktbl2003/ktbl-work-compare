package com.kuiren;

import com.alibaba.druid.spring.boot3.autoconfigure.DruidDataSourceAutoConfigure;
import com.mgi.words.DocComparator;
import com.mgi.words.DocConfig;
import org.apache.poi.openxml4j.util.ZipSecureFile;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication( exclude = {DataSourceAutoConfiguration.class, DruidDataSourceAutoConfigure.class, HibernateJpaAutoConfiguration.class})
@Configuration
@EnableCaching
@EnableAsync
@ConfigurationPropertiesScan
public class MainApplication {

    public static void main(String[] args) {
//        try {
//            ZipSecureFile.setMinInflateRatio(0.001);  // 将最小解压比例调至0.1%
//            String finalDocxPath = "D:\\00mgi\\mgi-words\\mgi-words-compare\\doc\\t04\\001-01.docx";
//            String templateDocxPath = "D:\\00mgi\\mgi-words\\mgi-words-compare\\doc\\t04\\001-00.docx";
//            DocConfig config = new DocConfig();
//            config.setEnableCache(true);
//            config.setBatchSize(20);
//            config.setNeedCheckStyle(false);
//            // 实例化比较器
//            DocComparator comparator = new DocComparator(config);
//            comparator.compareDocuments(finalDocxPath, templateDocxPath);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }

//        try {
//            ZipSecureFile.setMinInflateRatio(0.001);  // 将最小解压比例调至0.1%
//            String finalDocxPath = "D:\\ktbl-main\\ktbl-boot\\doc\\V0.1.docx";
//            String templateDocxPath ="D:\\ktbl-main\\ktbl-boot\\doc\\V0.8.docx";
//            DocConfig config = new DocConfig();
//            config.setEnableCache(true);
//            config.setBatchSize(20);
//            config.setNeedCheckStyle(false);
//            // 实例化比较器
//            DocComparator comparator = new DocComparator(config);
//            comparator.compareDocuments(finalDocxPath, templateDocxPath);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        SpringApplication application = new SpringApplication(MainApplication.class);
//        application.setAllowCircularReferences(true);
//        application.setAllowBeanDefinitionOverriding(true);
//        application.run(args);
        System.out.println("ヾ(◍°∇°◍)ﾉﾞ    启动成功      ヾ(◍°∇°◍)ﾉﾞ");

    }


}
