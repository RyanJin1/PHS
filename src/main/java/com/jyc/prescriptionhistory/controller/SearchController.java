package com.jyc.prescriptionhistory.controller;


import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jyc.prescriptionhistory.bean.Prescription;
import com.jyc.prescriptionhistory.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Controller
public class SearchController {
    @Autowired
    SearchService searchService;

    private String keyword;

    @GetMapping(value="/prescription")
    public String getPrescription(@RequestParam("keywords") String keywords,
                                  Map<String,Object> map){
        keyword=keywords;
        PageHelper.startPage(1,10);
        List<Prescription> prescriptions = searchService.getPrescription(keywords);
        PageInfo<Prescription> info = new PageInfo<>(prescriptions);
        map.put("prescriptions",info);
        return "search_res";

    }

    @GetMapping(value="/prescription/{pageNum}")
    public String getPrescriptionByPage(@PathVariable Integer pageNum,
                                        Map<String,Object> map){
        PageHelper.startPage(pageNum,10);
        List<Prescription> prescriptions = searchService.getPrescription(keyword);
        PageInfo<Prescription> info = new PageInfo<>(prescriptions,3);
        map.put("prescriptions",info);
        return "search_res";
    }


}
