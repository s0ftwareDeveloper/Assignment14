package com.coderscampus.Assignment14.web;

import com.coderscampus.Assignment14.domain.Channel;
import com.coderscampus.Assignment14.domain.User;
import com.coderscampus.Assignment14.service.ChannelService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
@AllArgsConstructor
public class ChannelController {

    private final ChannelService channelService;

    @GetMapping("/channels")
    public String getChannels(@ModelAttribute("user") User user, ModelMap model) {
        List<Channel> channels = channelService.findAll();
        model.addAttribute("channels", channels);
        return "channels";
    }

    @GetMapping("/channels/{channelId}")
    public String getChannel(@PathVariable Long channelId, ModelMap model) {
        Channel channel = channelService.findById(channelId);
        if (channel == null) {
            return "redirect:/error";
        }
        List<Channel> channels = channelService.findAll();
        model.addAttribute("channels", channels);
        model.addAttribute("channel", channel);
        return "channel";
    }
}
