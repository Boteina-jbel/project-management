package com.example.controllers;

import com.example.dto.UserRequestDto;
import com.example.dto.UserResponseDto;
import com.example.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {


    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public List<UserResponseDto> getUser(){
        return userService.findAll();
    }

    @PostMapping("")
    public UserResponseDto save(@RequestBody() UserRequestDto userRequestDto){
        return userService.save(userRequestDto);
    }

    @GetMapping("/id/{id}")
    public UserResponseDto findById(@PathVariable("id") Long id) {
        return userService.findById(id);
    }

    @GetMapping("/username/{username}")
    public UserResponseDto findByUsername(@PathVariable("username") String username) {
        return userService.findByUsername(username);
    }

    @DeleteMapping("/id/{id}")
    public void delete(@PathVariable() Long id) {
        userService.delete(id);
    }

    @PutMapping("/id/{id}")
    public UserResponseDto update(@RequestBody() UserRequestDto userRequestDto,@PathVariable() Long id) {
        return userService.update(userRequestDto, id);
    }
}
