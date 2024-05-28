package floflo.api.koss.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import floflo.api.koss.entity.TestEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class TestController {
    
        @GetMapping("/hello")
        public String test(){
            return "Hello World";
        }

        @PostMapping("/hello")
        public String postTest(@RequestBody TestEntity entity) {
            //TODO: process POST request
            
            return "Hi , you post a request with name: " + entity.getName() + " and phone: " + entity.getPhone() + " successfully";
        }
}
