package com.coderscampus.Assignment14.domain;

import com.coderscampus.Assignment14.repository.MessageRepository;
import com.coderscampus.Assignment14.service.MessageService;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Channel {

    private long id;
    private String name;
    private MessageRepository messageRepository = new MessageRepository();
    private MessageService messageService = new MessageService(messageRepository);

}
