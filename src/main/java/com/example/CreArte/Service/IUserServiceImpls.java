package com.example.CreArte.Service;


import com.example.CreArte.Dto.UsersDTO;
import com.example.CreArte.Request.CreateUserRequest;

import java.util.List;

public interface IUserServiceImpls {
    UsersDTO registerUser(CreateUserRequest request);
    UsersDTO updateUser(CreateUserRequest request, long id);
    UsersDTO deleteUser(long id);
    List<UsersDTO> getUsersAll();
    UsersDTO getUserById(long id);
    UsersDTO login(String email, String password);

}
