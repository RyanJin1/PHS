package com.jyc.prescriptionhistory.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class helloController {

//    @RequestMapping("/")
//    public String hello(){
//        return "main";
//    }


    @RequestMapping("/success")
    public String success(){
        return "success";
    }

    @RequestMapping("/logout")
    public String logout(){
        return "redirect:/";
    }
}
