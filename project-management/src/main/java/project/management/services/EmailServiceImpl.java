package project.management.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import project.management.entities.User;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailServiceImpl(JavaMailSender javaMailSender){
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("anasboukhlijapro@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        javaMailSender.send(message);
    }

    public void sendPasswordEmail(User user, String password) throws IOException {
        String template = loadTemplate("email-template.txt");
        String text = template
                .replace("{firstName}", user.getFirstName())
                .replace("{password}", password);
        sendSimpleMessage(user.getEmail(), "Your Project Planner Application Password", text);
    }

    private String loadTemplate(String path) throws IOException {
        ClassPathResource resource = new ClassPathResource(path);
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }
}
