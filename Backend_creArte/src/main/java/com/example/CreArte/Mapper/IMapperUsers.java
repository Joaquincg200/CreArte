package com.example.CreArte.Mapper;

import com.example.CreArte.Dto.UsersDTO;
import com.example.CreArte.Entity.Users;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.Optional;

@Mapper(componentModel = "spring")
public interface IMapperUsers {
    @Mapping(target = "avatar", source = "avatar")
    UsersDTO userToUsserDTO(Users user);
    List<UsersDTO> usersDTOToUsers(List<Users> users);
}
