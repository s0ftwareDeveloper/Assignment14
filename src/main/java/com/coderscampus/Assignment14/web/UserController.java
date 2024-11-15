package com.coderscampus.Assignment14.web;

import com.coderscampus.Assignment14.domain.Channel;
import com.coderscampus.Assignment14.domain.Message;
import com.coderscampus.Assignment14.domain.User;
import com.coderscampus.Assignment14.dto.MessageDTO;
import com.coderscampus.Assignment14.service.ChannelService;
import com.coderscampus.Assignment14.service.MessageService;
import com.coderscampus.Assignment14.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j //for logging
@AllArgsConstructor
@Controller
public class UserController {

    private final UserService userService;
    private final ChannelService channelService;
    private final MessageService messageService;

    @GetMapping("/welcome")
    public String getWelcomePage(ModelMap model, HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user == null) {
            user = new User();
        }
        model.addAttribute("user", user);
        return "welcome";
    }

    @PostMapping("/welcome")
    public String postWelcomePage(User user, RedirectAttributes redirectAttributes, HttpSession session) {
        redirectAttributes.addFlashAttribute("user", userService.save(user));
        session.setAttribute("user", user);
        return "redirect:/channels";
    }

    @GetMapping("/channels")
    public String getChannels(@ModelAttribute("user") User user, ModelMap model) {
        List<Channel> channels = channelService.getChannelList();
        model.addAttribute("channels", channels);
        return "channels";
    }

    @GetMapping("/channels/{channelId}")
    public String getChannel(@PathVariable Long channelId, ModelMap model) {
        Channel channel = channelService.findById(channelId);
        if (channel == null) {
            return "redirect:/error";
        }
        List<Channel> channels = channelService.getChannelList();
        model.addAttribute("channels", channels);
        model.addAttribute("channel", channel);
        return "channel";
    }

    /**
     * Takes in request body info to a MessageDTO. Then takes the info in the messageDTO and
     * assigns it to a new message object to be added to a channel and saved.
     * @param channelId id of the channel
     * @param messageDto information to be saved in new message object
     * @return if message was saved properly
     */
    @PostMapping("/channels/{channelId}")
    @ResponseBody
    public Boolean saveMessage(@PathVariable Long channelId, @RequestBody MessageDTO messageDto) {
        try {
            Channel channel = channelService.findById(channelId);
            Message message = new Message(messageDto.getText(), messageDto.getSender(), channel, messageDto.getSenderId());
            channel.addMessage(message);
            messageService.save(message);
            channelService.save(channel);
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
    @GetMapping("/channels/{channelId}/get-messages")
    @ResponseBody
    public List<MessageDTO> getMessages(@PathVariable Long channelId) {
        Channel channel = channelService.findById(channelId);
        return channel.getMessages().stream()
                      .map(message -> new MessageDTO(message.getText(), message.getSender(), message.getSenderId()))
                      .collect(Collectors.toList());
    }
}
