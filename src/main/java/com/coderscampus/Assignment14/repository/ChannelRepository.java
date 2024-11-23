package com.coderscampus.Assignment14.repository;

import com.coderscampus.Assignment14.domain.Channel;
import com.coderscampus.Assignment14.domain.Message;
import jakarta.annotation.PostConstruct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ChannelRepository {

    private final List<Channel> channelList = new ArrayList<>();

    private void createChannel(String name, int id) {
        Channel channel = new Channel();
        channel.setName(name);
        channel.setId(id);
        channelList.add(channel);
    }

    @PostConstruct
    public void generateChannelList() {
        createChannel("general", 1);
        createChannel("comp-sci", 2);
        createChannel("coders-campus", 3);
        createChannel("winging-it", 4);
    }

    public Channel findById(Long id) {
        return channelList.stream().filter(channel -> channel.getId() == id)
                .findFirst().orElse(null);
    }

    public Channel saveMessage(Channel channel, Message message) {
        findById(channel.getId()).getMessageService().save(message);
        return channel;
    }

    public List<Channel> findAll() {
        return channelList;
    }
}
