package project.management.services;

import jakarta.persistence.EntityNotFoundException;
import project.management.dto.UserRequestDto;
import project.management.dto.UserResponseDto;
import project.management.entities.User;
import project.management.repositories.UserRepository;
import project.management.utils.JwtTokenManager;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;
    private JwtTokenManager jwtTokenManager;
    private ModelMapper modelMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, JwtTokenManager jwtTokenManager) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.jwtTokenManager = jwtTokenManager;
    }


    @Override
    public UserResponseDto save(UserRequestDto userRequestDto) {
        User user = modelMapper.map(userRequestDto,User.class);
        User saved = userRepository.save(user);
        return modelMapper.map(saved,UserResponseDto.class);
    }

    @Override
    public UserResponseDto authenticate(UserRequestDto userRequestDto){
        // Retrieve the user from DB
        User user = userRepository.findByUsername(userRequestDto.getUsername());

        // First check if the user exists and match the password from FE
        if (user == null) throw new RuntimeException("Login or Password invalid");
        if(! userRequestDto.getPassword().equals(user.getPassword())) throw new RuntimeException("Login or Password invalid");
        
        // Generate token
        String token = jwtTokenManager.createToken(user.getUsername());

        // Mapping to DTO and set the generated token
        UserResponseDto userResponseDto = modelMapper.map(user, UserResponseDto.class);
        userResponseDto.setToken(token);

        return userResponseDto;
    }

    @Override
    public UserResponseDto findById(Long id) {
        User user =userRepository.findById(id).orElseThrow(()->new RuntimeException("User not found"));
        return modelMapper.map(user,UserResponseDto.class);
    }

    @Override
    public UserResponseDto findByUsername(String username) {
        User user =userRepository.findByUsername(username);
        return modelMapper.map(user,UserResponseDto.class);
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserResponseDto update(UserRequestDto userRequestDto, Long id) {
        Optional<User> userOptional =userRepository.findById(id);
        if (userOptional.isPresent()){
            User user=modelMapper.map(userRequestDto, User.class);
            user.setId(id);
            User updated= userRepository.save(user);
            return modelMapper.map(updated,UserResponseDto.class);
        }else {
            throw new EntityNotFoundException("User not found");
        }
    }

    @Override
    public List<UserResponseDto> findAll() {
        return userRepository.findAll()
                .stream().map(el->modelMapper.map(el, UserResponseDto.class))
                .collect(Collectors.toList());
    }
}
