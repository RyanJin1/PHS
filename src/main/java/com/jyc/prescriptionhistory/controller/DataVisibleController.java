package com.jyc.prescriptionhistory.controller;

import com.jyc.prescriptionhistory.bean.HistoryRecords;
import com.jyc.prescriptionhistory.bean.Prescription;
import com.jyc.prescriptionhistory.bean.PrescriptionHistory;
import com.jyc.prescriptionhistory.service.DataVisibleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
public class DataVisibleController {

    @Autowired
    DataVisibleService dataVisibleService;

    @GetMapping(value = "/visibleData/{presName}")
    public String dataVisibleController(@PathVariable("presName") String presName,
                                        Map<String, Object> map) {
        List<PrescriptionHistory> phs = dataVisibleService.getPrescriptionHistoryByName(presName);
        List<Object> dimensions = dataVisibleService.dimensionHandler(phs);
        List<List<Object>> visibleData = dataVisibleService.dataHandler(phs);
        List<PrescriptionHistory> info = dataVisibleService.getPrescriptionHistoryInfo(presName);
        List<String> indications=dataVisibleService.getIndications(presName);
        List<String> ages=dataVisibleService.getHistoryAge(presName);
        if (info.size() != 0) {
            map.put("info", info.get(0));
            map.put("indications",indications);
            map.put("ages",ages);
        } else {
            map.put("info", null);
            map.put("msg", "暂无数据");
        }
        map.put("presName", presName);
        map.put("visibleData", visibleData);
        map.put("dimensions", dimensions);
        return "main";

    }

    @GetMapping(value = "/presInfo")
    @ResponseBody
    public PrescriptionHistory infoUpdate(@RequestParam("index") String index, @RequestParam("presName") String presName, Map<String, Object> map) {
//        System.out.println(presName+"-"+index);
        List<PrescriptionHistory> info = dataVisibleService.getPrescriptionHistoryInfo(presName);
//        map.put("info",Info.get(Integer.parseInt(index)));
        return info.get(Integer.parseInt(index));
    }

    @GetMapping(value = "/presRecord")
    @ResponseBody
    public List<HistoryRecords> presRecordsVisible() {
        List<HistoryRecords> records = dataVisibleService.getPrescriptionHistoryRecord();
        return records;
    }

    @GetMapping(value = "/GraphData/{presName}")
    @ResponseBody
    public List<PrescriptionHistory> getHistoryGraphData(@PathVariable("presName") String presName, Map<String,Object> map){
        List<PrescriptionHistory> ph = dataVisibleService.getHistoryRelationship(presName);
        return ph;
    }


    @GetMapping(value = "/dataVisualization/{presName}")
    public String dataVisualizationController(@PathVariable("presName") String presName,
                                              Map<String, Object> map) {
        map.put("keyName",presName);
        return "main_2";
    }

    //get data
    @GetMapping("/visualData/{presName}")
    @ResponseBody
    public List<PrescriptionHistory> getPrescriptionHistoryInfo(@PathVariable String presName,Map<String,Object> map){
        List<PrescriptionHistory> phs = dataVisibleService.getHistoriesByName(presName);
        return phs;
    }


}
