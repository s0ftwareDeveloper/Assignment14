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


@AllArgsConstructor
@Controller
public class UserController {

    private final UserService userService;

    @GetMapping("/")
    public String redirectToWelcomePage() {
        return "redirect:/welcome";
    }

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
}
