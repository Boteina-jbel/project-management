package project.management.services;

import project.management.entities.User;

import java.io.IOException;

public interface EmailService {

    void sendSimpleMessage(String to, String subject, String text);

    void sendPasswordEmail(User user, String password) throws IOException;
}
