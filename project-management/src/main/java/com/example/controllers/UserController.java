package com.example.controllers;

import com.example.dto.UserRequestDto;
import com.example.dto.UserResponseDto;
import com.example.entities.User;
import com.example.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {


    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //    @PostMapping("/add")
//    public String add(@RequestBody User user){
//        userService.save(user);
//        return "New user is added";
//    }

    @GetMapping("")
    public List<UserResponseDto> getUser(){
        return userService.findAll();
    }

    @PostMapping("")
    public UserResponseDto save(@RequestBody() UserRequestDto userRequestDto){
        return userService.save(userRequestDto);
    }
}
