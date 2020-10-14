package com.jyc.prescriptionhistory.service;

import com.jyc.prescriptionhistory.bean.HistoryComponents;
import com.jyc.prescriptionhistory.bean.HistoryRecords;
import com.jyc.prescriptionhistory.bean.Prescription;
import com.jyc.prescriptionhistory.bean.PrescriptionHistory;
import com.jyc.prescriptionhistory.mapper.PrescriptionHistoryMapper;
import com.jyc.prescriptionhistory.utils.NewLineUtil;
import com.jyc.prescriptionhistory.utils.SortUtil;
import org.springframework.stereotype.Service;
import sun.util.PreHashedMap;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Service
public class DataVisibleServiceImpl implements DataVisibleService {

    @Resource
    PrescriptionHistoryMapper mapper;


    @Override
    public List<List<Object>> dataHandler(List<PrescriptionHistory> phs) {
        List<List<Object>> res=new ArrayList<>();
        for(PrescriptionHistory ph:phs){
            List<Object> tmp=new ArrayList<>();
            tmp.add(ph.getBookName());
            for(HistoryComponents hc:ph.getHc()){
                tmp.add(hc.getContent());
            }
            res.add(tmp);
        }
        return res;
    }
//
    @Override
    public List<Object> dimensionHandler(List<PrescriptionHistory> phs) {
        List<Object> dimensions=new ArrayList<>();
        dimensions.add("book");
        if(phs.size()!=0) {
            List<HistoryComponents> hcs = phs.get(0).getHc();
            for (HistoryComponents hc : hcs) {
                dimensions.add(hc.getPlantName());
            }
        }
        return dimensions;
    }
//
//    @Override
//    public List<String> bookHandler(List<PrescriptionHistory> phs) {
//        List<String> books=new ArrayList<>();
//        for(PrescriptionHistory ph:phs){
//            books.add(ph.getBookName());
//        }
//        return books;
//    }

    @Override
    public List<PrescriptionHistory> getPrescriptionHistoryByName(String presName) {
        List<PrescriptionHistory> phs = mapper.getPrescriptionHistoryByName(presName);
        return phs;
    }

    @Override
    public List<PrescriptionHistory> getPrescriptionHistoryInfo(String presName) {
        List<PrescriptionHistory> prescriptionHistoryInfo = mapper.getPrescriptionHistoryInfo(presName);
        List<PrescriptionHistory> phs=SortUtil.DynastySort(prescriptionHistoryInfo);
        return phs;
    }

    @Override
    public List<String> getIndications(String presName) {
        List<PrescriptionHistory> prescriptionHistoryInfo = mapper.getPrescriptionHistoryInfo(presName);
        List<String> i=new ArrayList<>();
        for(PrescriptionHistory ph:prescriptionHistoryInfo){
            if(ph.getIndication()!=null){
                i.add(ph.getIndication());
            }
            else
                i.add(" ");
        }
        return i;
    }

    @Override
    public List<String> getHistoryAge(String presName) {
        List<String> ages = mapper.getHistoryAgeByPresName(presName);
        return ages;

    }

    @Override
    public List<HistoryRecords> getPrescriptionHistoryRecord() {
        List<PrescriptionHistory> histories = mapper.getAllHistoryHaveAge();
        List<HistoryRecords> records = mapper.getHistoryNumByAgeAndPresName();
        List<String> AGES=Arrays.asList("汉","唐","宋","元","明","清","现代","其他");
        for(HistoryRecords record:records){
            List<String> books = mapper.getBooksByAgeAndPresName(record);
            if(!AGES.contains(record.getAge())){
                for (int i = 0; i < books.size() ; i++) {
                    String tmp=books.get(i)+"("+record.getAge()+")";
                    books.set(i,tmp);
                }
                record.setAge("其他");
            }
            record.setBookNames(books);
        }
        return records;
    }

    @Override
    public List<PrescriptionHistory> getHistoryRelationship(String presName) {
        List<PrescriptionHistory> ph = mapper.getPrescriptionHistoryInfoByPresName(presName);
        return ph;
    }

    @Override
    public List<PrescriptionHistory> getHistoriesByName(String presName) {
        List<PrescriptionHistory> res = mapper.getHistoriesByName(presName);
        return  res;
    }
}
