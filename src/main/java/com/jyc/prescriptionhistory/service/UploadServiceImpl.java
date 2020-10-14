package com.jyc.prescriptionhistory.service;


import com.jyc.prescriptionhistory.bean.Prescription;
import com.jyc.prescriptionhistory.mapper.PrescriptionMapper;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Service
public class UploadServiceImpl implements UploadService{

    @Resource
    PrescriptionMapper prescriptionMapper;

    @Override
    public Boolean importExcel(MultipartFile file) throws IOException, InvalidFormatException {
        List<Prescription> prescriptions=new ArrayList<>();
        int i=0;
        Workbook workbook = WorkbookFactory.create(file.getInputStream());
        for(Sheet sheet:workbook){
            if(sheet==null)
                continue;
            int num=sheet.getLastRowNum();
            System.out.println(num);
            for (int rowNum = 0; rowNum < num; rowNum++){
                    Row row=sheet.getRow(rowNum);
                    if(row!=null) {
                        Prescription pres = new Prescription();
                        Cell name = row.getCell(0);
                        Cell pinyin = row.getCell(1);
                        Cell way = row.getCell(2);
                        Cell eff = row.getCell(3);
                        Cell ind = row.getCell(4);
                        Cell des = row.getCell(5);
                        pres.setPresName(name.getStringCellValue());
                        pres.setPinYin(pinyin.getStringCellValue());
                        pres.setUseWay(way.getStringCellValue());
                        pres.setEffects(eff.getStringCellValue());
                        pres.setIndications(ind.getStringCellValue());
                        pres.setDescription(des.getStringCellValue());
                        prescriptions.add(pres);
                    }
                    else{
                        break;
                    }
                }
             i = prescriptionMapper.addPrescriptionBatch(prescriptions);
        }
        if(i>0)
            return true;
        else
            return false;

    }





}
