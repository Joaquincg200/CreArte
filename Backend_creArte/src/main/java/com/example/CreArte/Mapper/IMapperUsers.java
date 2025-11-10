package com.example.CreArte.Mapper;

import com.example.CreArte.Dto.UsersDTO;
import com.example.CreArte.Entity.Users;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper(componentModel = "spring")
public interface IMapperUsers {
    UsersDTO userToUsserDTO(Users user);
    List<UsersDTO> usersDTOToUsers(List<Users> users);
    Users  usersToOptionalUsers(Optional<Users> users);
}
