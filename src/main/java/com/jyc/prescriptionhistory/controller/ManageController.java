package com.jyc.prescriptionhistory.controller;

import com.jyc.prescriptionhistory.bean.HistoryComponents;
import com.jyc.prescriptionhistory.bean.Prescription;
import com.jyc.prescriptionhistory.bean.PrescriptionHistory;
import com.jyc.prescriptionhistory.service.ManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Controller
public class ManageController {

    @Autowired
    ManageService manageService;

    //获取所有方剂历史信息
    @GetMapping("/prescriptionHistory")
    @ResponseBody
    public List<PrescriptionHistory> getAllPrescriptionHistory(){
        List<PrescriptionHistory> phs = manageService.getAllPrescriptionHistory();
        return phs;
    }
    //获取方剂组分
    @GetMapping("/components")
    @ResponseBody
    public List<HistoryComponents> getHistoryComponentsById(@RequestParam("historyId") Integer historyId){
        List<HistoryComponents> hcs = manageService.getHisComponentsByHid(historyId);
        if(hcs.size()!=0) {
            return hcs;
        }
        else{
            return null;
        }
    }
    //获取所有方剂信息
    @GetMapping("/prescriptions")
    @ResponseBody
    public Collection<Prescription> getAllPrescription(){
        Collection<Prescription> prescription = manageService.getAllPrescription();
        return prescription;
    }
    //添加方剂
    @PostMapping("/prescription")
    @ResponseBody
    public String addPrescription(@RequestBody Prescription prescription){
//        System.out.println(prescription);
        Boolean flag = manageService.addPrescription(prescription);
        if(flag)
            return "OK";
        else
            return "ERROR";
    }
    //删除方剂
    @DeleteMapping("/prescriptions")
    @ResponseBody
    public String delPrescription(@RequestBody List<Prescription> prescriptions){
        Boolean flag = manageService.delPrescription(prescriptions);
        if(flag)
            return "OK";
        else
            return "ERROR";
    }
    //修改方剂
    @PutMapping("/prescription/{presId}")
    @ResponseBody
    public String updatePrescription(@PathVariable String presId,@RequestBody Prescription prescription){
        Boolean flag = manageService.updatePrescription(prescription);
        if(flag)
            return "OK";
        else
            return "ERROR";
    }

    //进入方剂历史管理页面
    @GetMapping("/prescriptionHistory/{presId}")
    public String toHistoryManage(@PathVariable Integer presId,@RequestParam("presName") String presName, Map<String,Object> map){
        map.put("presId",presId);
        map.put("presName",presName);
        return "manage";

    }
    //获取方剂历史信息
    @GetMapping("/prescriptionHistoryInfo/{presId}")
    @ResponseBody
    public List<PrescriptionHistory> getPrescriptionHistoryInfo(@PathVariable Integer presId,Map<String,Object> map){
        List<PrescriptionHistory> phs = manageService.getPrescriptionHistoryByPresId(presId);
        return phs;
    }

    //添加方剂历史信息
    @PostMapping("/prescriptionHistory")
    @ResponseBody
    public Integer addPrescriptionHistory(@RequestBody PrescriptionHistory ph){
//        System.out.println(ph);
        Boolean flag = manageService.addPrescriptionHistory(ph);
        if(flag)
            return ph.getHistoryId();
        else
            return 0;
    }
    //修改方剂历史成分信息
    @PutMapping("/HistoryComponents/{historyId}")
    @ResponseBody
    public String updateHistoryComponents(@PathVariable("historyId") String historyId,@RequestBody List<HistoryComponents> hcs){
//        System.out.println(hcs);
//        System.out.println(historyId);
        Integer hid=Integer.parseInt(historyId);
        Boolean flag = manageService.updateHisComponents(hid, hcs);
        if(flag)
            return "OK";
        else
            return "ERROR";
    }

    //删除方剂历史信息
    @DeleteMapping("/prescriptionsHistory")
    @ResponseBody
    public String delPresHistory(@RequestBody List<PrescriptionHistory> phs){
        Boolean flag = manageService.delPresHistory(phs);
        if(flag)
            return "OK";
        else
            return "ERROR";
    }

    //修改方剂历史信息
    @PutMapping("/prescriptionHistory/{historyId}")
    @ResponseBody
    public String updatePresHistory(@PathVariable String historyId,@RequestBody PrescriptionHistory ph){
        Boolean flag = manageService.updatePresHistory(ph);
        if(flag)
            return "OK";
        else
            return "ERROR";
    }




}
