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

    @GetMapping(value = "/faultDetect_index")
    public String faultDetectIndex(){
        return "faultDetect/faultDetect_index";
    }

    @GetMapping(value = "/faultDetect_heartbeat")
    public String faultDetectHea(){
        return "faultDetect/deviceControl/faultDetect_heartbeat";
    }

    @GetMapping(value = "/faultDetect_communicate")
    public String faultDetectCom(){
        return "faultDetect/deviceControl/faultDetect_communicate";
    }

    @GetMapping(value = "/faultDetect_workstate")
    public String faultDetectWor(){
        return "faultDetect/deviceControl/faultDetect_workstate";
    }

    @GetMapping(value = "/login")
    public String login(){
        return "USER/login";
    }

}
