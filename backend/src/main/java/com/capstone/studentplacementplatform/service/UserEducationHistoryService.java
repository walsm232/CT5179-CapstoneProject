package com.capstone.studentplacementplatform.service;

import com.capstone.studentplacementplatform.model.UserEducationHistory;
import com.capstone.studentplacementplatform.model.User;
import com.capstone.studentplacementplatform.repository.UserEducationHistoryRepository;
import com.capstone.studentplacementplatform.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserEducationHistoryService {

    @Autowired
    private UserEducationHistoryRepository educationHistoryRepository;

    @Autowired
    private UserRepository userRepository;

    public List<UserEducationHistory> findByUserId(Long userId) {
        return educationHistoryRepository.findByUserId(userId);
    }

    public Optional<UserEducationHistory> findById(Long id) {
        return educationHistoryRepository.findById(id);
    }

    public UserEducationHistory save(UserEducationHistory educationHistory) {
        return educationHistoryRepository.save(educationHistory);
    }

    public void deleteById(Long id) {
        educationHistoryRepository.deleteById(id);
    }

    public UserEducationHistory saveEducationHistory(Long userId, String institutionName, String degree, String major, Date startDate, Date endDate) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        UserEducationHistory educationHistory = new UserEducationHistory();
        educationHistory.setUser(user);
        educationHistory.setInstitutionName(institutionName);
        educationHistory.setDegree(degree);
        educationHistory.setMajor(major);
        educationHistory.setStartDate(startDate);
        educationHistory.setEndDate(endDate);

        return educationHistoryRepository.save(educationHistory);
    }
}
