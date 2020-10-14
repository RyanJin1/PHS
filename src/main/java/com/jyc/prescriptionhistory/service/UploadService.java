package com.jyc.prescriptionhistory.service;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UploadService {

    public Boolean importExcel(MultipartFile file) throws IOException, InvalidFormatException;
}
