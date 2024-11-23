package com.coderscampus.Assignment14.domain;

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
    private List<Message> messages = new ArrayList<>();
}
