package com.coderscampus.Assignment14.repository;

import com.coderscampus.Assignment14.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class MessageRepository {
    List<Message> messages = new ArrayList<>();

    public void save(Message message) {
        messages.add(message);
    }
}
