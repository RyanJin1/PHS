package com.jyc.prescriptionhistory.controller;

import com.jyc.prescriptionhistory.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
public class LoginController {

   @Autowired
    private LoginService loginService;

   @PostMapping(value="/login")
   public String userLogin(@RequestParam("username") String username,
                           @RequestParam("password") String password,
                           Map<String,Object> map, HttpSession session){
       if(username.equals("")||password.equals("")){
           map.put("msg","用户名或密码不能为空");
           return "index";
       }
       boolean flag = loginService.userLogin(username, password);
       if(flag){
           map.put("msg","");
           session.setAttribute("loginUser",username);
           return "redirect:/manage_index.html";
       }else{
           map.put("msg","用户名或密码错误,登录失败");
           return "index";
       }
   }
}
