package com.jyc.prescriptionhistory.utils;

import com.jyc.prescriptionhistory.bean.HistoryComponents;
import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class DescriptionUtils {

    public static String createCompDescription(List<HistoryComponents> hcs){
        List<String> CompDescriptions=new ArrayList<>();
        for(HistoryComponents hc:hcs){
            String hcd=hc.getPlantName()+hc.getContent()+"g";
            CompDescriptions.add(hcd);
        }
        return org.apache.commons.lang.StringUtils.join(CompDescriptions, ";");

    }
}
