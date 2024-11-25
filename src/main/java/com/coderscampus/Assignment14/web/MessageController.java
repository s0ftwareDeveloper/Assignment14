package com.coderscampus.Assignment14.web;

import com.coderscampus.Assignment14.domain.Channel;
import com.coderscampus.Assignment14.domain.Message;
import com.coderscampus.Assignment14.service.ChannelService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j //for logging
@Controller
@AllArgsConstructor
public class MessageController {

    private final ChannelService channelService;

    /**
     * Takes in request body info to a MessageDTO. Then takes the info in the messageDTO and
     * assigns it to a new message object to be added to a channel and saved.
     * @param channelId id of the channel
     * @return if message was saved properly
     */
    @PostMapping("/channels/{channelId}")
    @ResponseBody
    public Boolean saveMessage(@PathVariable Long channelId, @RequestBody Message message) {
        try {
            Channel channel = channelService.findById(channelId);
            channelService.save(channel, message);
            return true;
        } catch (Exception e) {
            log.error("e: ", e);
            return false;
        }
    }

    /**
     * gets messages in channel and turned them into list of MessageDTOs
     * I did this because the circular relationship between channel and messages made an infinite
     * loop and the list of messages could not be converted to json properly
     * @param channelId id of the channel
     * @return list of messageDTOs
     */
    @ResponseBody
    @GetMapping("/channels/{channelId}/get-messages")
    public List<Message> getMessages(@PathVariable Long channelId) {
        Channel channel = channelService.findById(channelId);
        return channel.getMessageService().findAll();
    }
}
