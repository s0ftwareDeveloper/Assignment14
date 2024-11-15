package com.coderscampus.Assignment14.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long messageId;
    private String text;
    private String sender;
    private long senderId;
    @ManyToOne
    @JoinColumn(name = "channel_id")
    private Channel channel;

    public Message(String text, String sender, Channel channel, long senderId) {
        this.text = text;
        this.sender = sender;
        this.channel = channel;
        this.senderId = senderId;
    }

    public Message() {
    }
}
