package com.jyc.prescriptionhistory.controller;

import com.jyc.prescriptionhistory.bean.Prescription;
import com.jyc.prescriptionhistory.service.UploadService;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UploadController {

    @Autowired
    UploadService uploadService;

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @ResponseBody
    private Map<String, Object> importExcel(@RequestParam(value = "excel_file", required = false) MultipartFile file, HttpServletRequest request){
        Map<String,Object> result= new HashMap<String, Object>();
        try {

            MultipartRequest multipartRequest = (MultipartRequest) request;
            MultipartFile excelFile = multipartRequest.getFile("excel_file");
            Boolean flag = uploadService.importExcel(excelFile);
            if(flag)
                result.put("msg","上传成功");
            else
                result.put("msg","上传失败");
        }
        catch (IOException e){
            result.put("msg","数据异常");
        }
        catch (InvalidFormatException e){
            result.put("msg","数据异常");
        }
        return result;
    }
}
