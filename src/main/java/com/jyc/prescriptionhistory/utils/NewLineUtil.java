package com.jyc.prescriptionhistory.utils;

import java.io.UnsupportedEncodingException;

public class NewLineUtil {
    /**
     * 插入方法
     *
     * @param num      每隔几个字符插入一个字符串（中文字符）
     * @param splitStr 待指定字符串
     * @param str      原字符串
     * @return 插入指定字符串之后的字符串
     * @throws UnsupportedEncodingException
     */
    public static String addStr(int num, String splitStr, String str)  {
        StringBuffer sb = new StringBuffer();
        String temp = str;
        int len = str.length();
        while (len > 0) {
            int idx = 0;
            try {
                idx = getEndIndex(temp, num);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sb.append(temp.substring(0, idx + 1)).append(splitStr);
            temp = temp.substring(idx + 1);
            len = temp.length();
        }
        return sb.toString();
    }


    /**
     * 两个数字/英文
     *  两个数字或者字母等同于一个汉汉字的长度
     * @param str 字符串
     * @param num 每隔几个字符插入一个字符串
     * @return int 最终索引
     * @throws UnsupportedEncodingException
     */
    public static int getEndIndex(String str, double num) throws UnsupportedEncodingException {
        int idx = 0;
        double val = 0.00;
        // 判断是否是英文/中文
        for (int i = 0; i < str.length(); i++) {
            if (String.valueOf(str.charAt(i)).getBytes("UTF-8").length >= 3) {
                // 中文字符或符号
                val += 1.00;
            } else {
                // 英文字符或符号
                val += 0.50;
            }
            if (val >= num) {
                idx = i;
                if (val - num == 0.5) {
                    idx = i - 1;
                }
                break;
            }
        }
        if (idx == 0) {
            idx = str.length() - 1;
        }
        return idx;
    }
}
