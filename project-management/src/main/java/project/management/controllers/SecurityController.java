package project.management.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import project.management.dto.UserRequestDto;
import project.management.dto.UserResponseDto;
import project.management.services.UserService;

@Controller
@RequestMapping("/security")
public class SecurityController {

    protected final UserService userService;

    @Autowired
    public SecurityController(UserService userService){
        this.userService = userService;
    }

    @PostMapping(value = "/login")
    public ResponseEntity<UserResponseDto> login(@RequestBody UserRequestDto userRequestDto) {
        return new ResponseEntity<>(userService.authenticate(userRequestDto), HttpStatus.OK);
    }

    @PostMapping(value = "/logout")
    public ResponseEntity logout(@RequestBody UserRequestDto userRequestDto) {
        userService.burnToken(userRequestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
