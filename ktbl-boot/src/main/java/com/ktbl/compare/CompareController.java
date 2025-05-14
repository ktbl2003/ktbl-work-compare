package com.ktbl.compare;

import com.ktbl.vo.Ret;
import com.ktbl.words.CmpComparator;
import com.ktbl.words.DocConfig;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;
import org.apache.poi.openxml4j.util.ZipSecureFile;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

//@Tag(name = "06.文档比较接口")
@RestController
@RequestMapping("/api")
public class CompareController {


    private static final String UPLOAD_DIR = "uploads/";

    // 文件上传接口
//    @Operation(summary = "文件上传")
    @PostMapping("/upload")
    public Ret handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return Ret.error("上传文件不能为空");
            }

            // 创建上传目录
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // 保存文件
            byte[] bytes = file.getBytes();
            Path path = uploadPath.resolve(file.getOriginalFilename());
            Files.write(path, bytes);

            return Ret.success(path.toString());
        } catch (IOException e) {
            return Ret.error("文件上传失败: " + e.getMessage());
        }
    }

//    @Operation(summary = "文档比较")
    @PostMapping("/compare")
    public void compareFiles(@RequestBody CompareRequest request, HttpServletRequest request1, HttpServletResponse response) {
        try {
            Path originalPath = Paths.get(request.getOriginal());
            Path modifiedPath = Paths.get(request.getModified());

            if (!Files.exists(originalPath) || !Files.exists(modifiedPath)) {
                throw new FileNotFoundException("文件不存在");
            }
            String templateDocxPath = originalPath.toString();
            String finalDocxPath = modifiedPath.toString();


            ZipSecureFile.setMinInflateRatio(0.0001);// 将最小解压比例调至0.1%
            System.setProperty("org.apache.poi.util.POIXMLTypeLoader.DEFAULT_MAX_ENTRIES", "1000000"); // 增加最大条目数
            System.setProperty("entityExpansionLimit", "1000000"); // 防止XML实体扩展攻击

            validateDocxFile(finalDocxPath);
            validateDocxFile(templateDocxPath);

            DocConfig config = new DocConfig();
            config.setEnableCache(true);
            config.setBatchSize(20);
            config.setNeedCheckStyle(false);
            // 实例化比较器
            CmpComparator comparator = new CmpComparator(config);
            InputStream stream = comparator.compareDocumentsInstream(finalDocxPath, templateDocxPath);
            // 设置响应头
            //   response.setContentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
            response.setHeader("Content-Disposition", "attachment; filename=compared.docx");
            // 在CompareController中添加响应头设置
            response.setContentType("application/octet-stream");
            response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("文档比较结果.docx", "UTF-8"));
            // 将流写入响应
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = stream.read(buffer)) != -1) {
                response.getOutputStream().write(buffer, 0, bytesRead);
            }
            stream.close();
            response.flushBuffer();

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            try {
                response.getWriter().write("文件比较失败: " + e.getMessage());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }

    }

    private static void validateDocxFile(String path) throws IOException {
        File file = new File(path);
        if (!file.exists()) {
            throw new FileNotFoundException("文档不存在: " + path);
        }
        if (!file.getName().endsWith(".docx")) {
            throw new IOException("非法的Word文档格式: " + path);
        }
    }

    // 添加请求体接收类
    @Data
    private static class CompareRequest {
        private String original;
        private String modified;
    }
}
