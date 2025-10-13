package com.example.CreArte.Service;

import com.example.CreArte.Dto.UsersDTO;
import com.example.CreArte.Entity.Users;
import com.example.CreArte.Mapper.IMapperUsers;
import com.example.CreArte.Repository.IRepositoryUsers;
import com.example.CreArte.Request.CreateUserRequest;
import com.example.CreArte.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpls implements IUserServiceImpls{
    private IRepositoryUsers repositoryUsers;
    private IMapperUsers mapperUsers;
    private JwtUtil jwtUtil;

    public UserServiceImpls(IRepositoryUsers repositoryUsers, IMapperUsers mapperUsers, JwtUtil jwtUtil) {
        this.repositoryUsers = repositoryUsers;
        this.mapperUsers = mapperUsers;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public UsersDTO registerUser(CreateUserRequest request) {
        Users user = new Users();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(BCrypt.hashpw(request.getPassword(), BCrypt.gensalt()));
        user.setRole(request.getRole());
        user.setRegistration_date(LocalDate.now());

        Users savedUser = this.repositoryUsers.save(user);
        return this.mapperUsers.userToUsserDTO(savedUser);
    }

    @Override
    public UsersDTO updateUser(CreateUserRequest request, long id) {
        Optional<Users> optionalUser = this.repositoryUsers.findById(id);
        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();
            user.setName(request.getName());
            user.setPassword(BCrypt.hashpw(request.getPassword(), BCrypt.gensalt()));
            user.setAvatar(request.getAvatar());
            user.setPhone(request.getPhone());
            Users savedUser = this.repositoryUsers.save(user);
            return this.mapperUsers.userToUsserDTO(savedUser);
        }else{
            return null;
        }

    }

    @Override
    public UsersDTO deleteUser(long id) {
        Optional<Users> optionalUser = this.repositoryUsers.findById(id);
        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();
            this.repositoryUsers.delete(user);
            return this.mapperUsers.userToUsserDTO(user);
        }else{
            return null;
        }
    }

    @Override
    public List<UsersDTO> getUsersAll() {
        List<Users> users = this.repositoryUsers.findAll();
        if (!users.isEmpty()) {
            return this.mapperUsers.usersDTOToUsers(users);
        } else {
            return null;
        }
    }

    @Override
    public UsersDTO getUserById(long id) {
        Optional <Users> optionalUser = this.repositoryUsers.findById(id);
        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();
            return this.mapperUsers.userToUsserDTO(user);
        }else{
            return null;
        }
    }

    @Override
    public UsersDTO login(String email, String password) {
        Optional<Users> optionalUsers = this.repositoryUsers.findByEmail(email);
        if (optionalUsers.isPresent()) {
            Users user = optionalUsers.get();
            if(BCrypt.checkpw(password, user.getPassword())){

                String token = this.jwtUtil.generateToken(user.getEmail(), user.getRole());

                UsersDTO userLogged = this.mapperUsers.userToUsserDTO(user);

                userLogged.setToken(token);

                return userLogged;
            }else{
                return null;
            }

        }else{
            return null;
        }
    }
}
