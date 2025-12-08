package com.example.CreArte.Controller;

import com.example.CreArte.Dto.UsersDTO;
import com.example.CreArte.Request.CreateUserRequest;
import com.example.CreArte.Request.LoginRequest;
import com.example.CreArte.Service.UserServiceImpls;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UsersController {

    private UserServiceImpls userServiceImpls;

    public UsersController(UserServiceImpls userServiceImpls) {
        this.userServiceImpls = userServiceImpls;
    }

    @GetMapping("/api/users")
    @Operation(summary = "Recibe todos los usuarios")
    public ResponseEntity<List<UsersDTO>> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(this.userServiceImpls.getUsersAll());
    }

    @PostMapping("/api/users/register")
    @Operation(summary = "Registra un nuevo usuario")
    public ResponseEntity<UsersDTO> registerUser(@RequestBody CreateUserRequest newUser) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.userServiceImpls.registerUser(newUser));
    }

    @GetMapping("/api/users/user/{id}")
    @Operation(summary = "Recibir un usuario por su id")
    public  ResponseEntity<UsersDTO>getUserById(@PathVariable long id){
        return ResponseEntity.status(HttpStatus.OK).body(this.userServiceImpls.getUserById(id));
    }

    @PostMapping("/api/users/login")
    @Operation(summary = "Login de usuario")
    public ResponseEntity<UsersDTO> loginUser(@RequestBody LoginRequest request){
        return ResponseEntity.status(HttpStatus.OK).body(this.userServiceImpls.login(request));
    }

    @DeleteMapping("/api/users/delete/{id}")
    @Operation(summary = "Elimina un usuario por su id")
    public ResponseEntity<UsersDTO> deleteUser(@PathVariable long id){
        return ResponseEntity.status(HttpStatus.OK).body(this.userServiceImpls.deleteUser(id));
    }

    @PutMapping("/api/users/update/{id}")
    @Operation(summary = "Actualiza un usuario por su id")
    public ResponseEntity<UsersDTO> updateUser(@RequestBody CreateUserRequest user, @PathVariable long id){
        return ResponseEntity.status(HttpStatus.OK).body(this.userServiceImpls.updateUser(user, id));
    }
}
