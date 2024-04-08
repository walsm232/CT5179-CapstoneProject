package com.capstone.studentplacementplatform.service;

import com.capstone.studentplacementplatform.model.UserSkills;
import com.capstone.studentplacementplatform.model.User;
import com.capstone.studentplacementplatform.repository.UserSkillRepository;
import com.capstone.studentplacementplatform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@Service
public class UserSkillService {

    private static final Logger logger = LoggerFactory.getLogger(UserSkillService.class);

    @Autowired
    private UserSkillRepository skillRepository;

    @Autowired
    private UserRepository userRepository;

    public List<UserSkills> findByUserId(Long userId) {
        return skillRepository.findByUserId(userId);
    }

    public UserSkills addSkillForUser(Long userId, UserSkills skill) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        skill.setUser(user);
        return skillRepository.save(skill);
    }

    public UserSkills save(UserSkills skill) {
        return skillRepository.save(skill);
    }

    public Optional<UserSkills> findById(Long id) {
        return skillRepository.findById(id);
    }

    public void deleteById(Long id) {
        skillRepository.deleteById(id);
    }
}
