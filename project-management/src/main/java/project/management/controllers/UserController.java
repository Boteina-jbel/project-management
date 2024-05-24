package project.management.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import project.management.dto.UserRequestDto;
import project.management.dto.UserResponseDto;
import project.management.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {


    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public ResponseEntity<List<UserResponseDto>>  getUser(){
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<UserResponseDto> save(@RequestBody() UserRequestDto userRequestDto){
        UserResponseDto userResponseDto= userService.save(userRequestDto);
        return new ResponseEntity<>(userResponseDto, HttpStatus.CREATED);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<UserResponseDto> authenticate(@RequestBody() UserRequestDto userRequestDto){
        UserResponseDto userResponseDto = userService.authenticate(userRequestDto);
        return new ResponseEntity<>(userResponseDto, HttpStatus.CREATED);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<UserResponseDto> findById(@PathVariable("id") Long id) {
        UserResponseDto userResponseDto= userService.findById(id);
        return ResponseEntity.ok(userResponseDto);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UserResponseDto> findByUsername(@PathVariable("username") String username) {
        UserResponseDto userResponseDto= userService.findByUsername(username);
        return ResponseEntity.ok(userResponseDto);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> delete(@PathVariable() Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/id/{id}")
    public ResponseEntity<UserResponseDto> update(@RequestBody() UserRequestDto userRequestDto,@PathVariable() Long id) {
        UserResponseDto userResponseDto= userService.update(userRequestDto, id);
        return ResponseEntity.accepted().body(userResponseDto);
    }
}
