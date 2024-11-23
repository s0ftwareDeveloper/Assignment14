package com.coderscampus.Assignment14.repository;

import com.coderscampus.Assignment14.domain.Channel;
import com.coderscampus.Assignment14.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Repository
public class UserRepository {
    private List<User> users = new ArrayList<User>();

    public User save(User user) {
        users.add(user);
        return user;
    }

    public User findByName(String name) {
        return users.stream().filter(user -> Objects.equals(user.getName(), name))
                          .findFirst().orElse(null);
    }

    public List<User> findAll() {
        return users;
    }
}
