package com.coderscampus.Assignment14.service;

import com.coderscampus.Assignment14.domain.Channel;
import com.coderscampus.Assignment14.domain.Message;
import com.coderscampus.Assignment14.repository.ChannelRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ChannelService {

    private final ChannelRepository channelRepo;

    public Channel findById(Long id) {
        return channelRepo.findById(id);
    }

    public void addMessage(Channel channel, Message message) {
        channel.getMessages().add(message);
    }

    public Channel save(Channel channel) {
        return channelRepo.save(channel);
    }

    public List<Channel> findAll() {
        return channelRepo.findAll();
    }
}
