package com.coderscampus.Assignment14.service;

import com.coderscampus.Assignment14.domain.Message;
import com.coderscampus.Assignment14.repository.MessageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public void save(Message message) {
        messageRepository.save(message);
    }

    public List<Message> findAll(){
        return messageRepository.findAll();
    }
}
