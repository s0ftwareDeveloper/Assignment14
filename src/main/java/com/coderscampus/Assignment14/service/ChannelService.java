package com.coderscampus.Assignment14.service;

import com.coderscampus.Assignment14.domain.Channel;
import com.coderscampus.Assignment14.repository.ChannelRepository;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChannelService {

    private final ChannelRepository channelRepo;
    @Getter
    private final List<Channel> channelList = new ArrayList<>();

    public ChannelService(ChannelRepository channelRepo) {
        this.channelRepo = channelRepo;
        generateChannelList();
    }

    public Channel findById(Long id) {
        return channelRepo.findByChannelId(id);
    }

    public Channel save(Channel channel) {
        return channelRepo.save(channel);
    }

    private Channel createChannel(String name) {
        Channel channel = new Channel();
        channel.setName(name);
        channelRepo.save(channel);
        return channel;
    }

    public void generateChannelList() {
        channelList.add(createChannel("general"));
        channelList.add(createChannel("comp-sci"));
        channelList.add(createChannel("coders-campus"));
        channelList.add(createChannel("winging-it"));
    }

}
