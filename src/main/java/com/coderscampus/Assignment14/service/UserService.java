package com.coderscampus.Assignment14.service;

import com.coderscampus.Assignment14.domain.User;
import com.coderscampus.Assignment14.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepo;

    public User save(User user) {
        return userRepo.save(user);
    }

    public List<User> findAll() {
        return userRepo.findAll();
    }

}
