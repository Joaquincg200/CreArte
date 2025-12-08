package com.example.CreArte.Service;

import com.example.CreArte.Dto.UsersDTO;
import com.example.CreArte.Entity.Users;
import com.example.CreArte.Mapper.IMapperUsers;
import com.example.CreArte.Repository.IRepositoryUsers;
import com.example.CreArte.Request.CreateUserRequest;
import com.example.CreArte.Request.LoginRequest;
import com.example.CreArte.exception.ExceptionUsersAlredyExists;
import com.example.CreArte.exception.ExceptionUsersNotFound;
import com.example.CreArte.exception.ExceptionUsersUnauthorized;
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

        if(this.repositoryUsers.existsByEmail(request.getEmail())){
            throw new ExceptionUsersAlredyExists("El usuario con el email "+ request.getEmail() + " ya existe.");
        }
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
            user.setPhone(request.getPhone());

            // Solo actualizar contraseña si no es null ni vacía
            if (request.getPassword() != null && !request.getPassword().isEmpty()) {
                user.setPassword(BCrypt.hashpw(request.getPassword(), BCrypt.gensalt()));
            }

            // Solo actualizar avatar si viene uno nuevo
            if (request.getAvatar() != null && !request.getAvatar().isEmpty()) {
                user.setAvatar(request.getAvatar());
            }

            Users savedUser = this.repositoryUsers.save(user);
            return this.mapperUsers.userToUsserDTO(savedUser);
        } else {
            throw new ExceptionUsersNotFound("El usuario con el id " + id + " no fue encontrado.");
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
            throw new ExceptionUsersNotFound("El usuario con el id "+ id + " no fue encontrado.");
        }
    }

    @Override
    public List<UsersDTO> getUsersAll() {
        List<Users> users = this.repositoryUsers.findAll();
        return this.mapperUsers.usersDTOToUsers(users);
    }

    @Override
    public UsersDTO getUserById(long id) {
        Optional <Users> optionalUser = this.repositoryUsers.findById(id);
        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();
            return this.mapperUsers.userToUsserDTO(user);
        }else{
            throw new ExceptionUsersNotFound("El usuario con el id "+ id + " no fue encontrado.");
        }
    }

    @Override
    public UsersDTO login(LoginRequest request) {
        Optional<Users> optionalUsers = this.repositoryUsers.findByEmail(request.getEmail());
        if (optionalUsers.isPresent()) {
            Users user = optionalUsers.get();
            if(BCrypt.checkpw(request.getPassword(), user.getPassword())){

                String token = this.jwtUtil.generateToken(user.getEmail(), user.getRole());

                UsersDTO userLogged = this.mapperUsers.userToUsserDTO(user);

                userLogged.setToken(token);

                return userLogged;
            }else{
                throw new ExceptionUsersUnauthorized("Contraseña incorrecta para el usuario con email "+ request.getEmail());
            }

        }else{
            throw new ExceptionUsersUnauthorized(("El usuario con el email "+ request.getEmail() + " no fue encontrado."));
        }
    }
}
