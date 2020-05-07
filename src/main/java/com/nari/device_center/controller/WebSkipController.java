package com.nari.device_center.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author yinyx
 * @version 1.0 2020/5/7
 */
@Controller
@RequestMapping
public class WebSkipController {


    @GetMapping(value = "/index")
    public String index(){
        return "index";
    }

    @GetMapping(value = "/keyInfo")
    public String keyInfo(){
        return "KPI/keyInfo";
    }

}
