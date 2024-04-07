package com.capstone.studentplacementplatform.service;

import com.capstone.studentplacementplatform.model.EducationHistory;
import com.capstone.studentplacementplatform.model.User;
import com.capstone.studentplacementplatform.repository.EducationHistoryRepository;
import com.capstone.studentplacementplatform.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EducationHistoryService {

    @Autowired
    private EducationHistoryRepository educationHistoryRepository;

    @Autowired
    private UserRepository userRepository;

    public List<EducationHistory> findByUserId(Long userId) {
        return educationHistoryRepository.findByUserId(userId);
    }

    public Optional<EducationHistory> findById(Long id) {
        return educationHistoryRepository.findById(id);
    }

    public EducationHistory save(EducationHistory educationHistory) {
        return educationHistoryRepository.save(educationHistory);
    }

    public void deleteById(Long id) {
        educationHistoryRepository.deleteById(id);
    }

    public EducationHistory saveEducationHistory(Long userId, String institutionName, String degree, String major, Date startDate, Date endDate) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        EducationHistory educationHistory = new EducationHistory();
        educationHistory.setUser(user);
        educationHistory.setInstitutionName(institutionName);
        educationHistory.setDegree(degree);
        educationHistory.setMajor(major);
        educationHistory.setStartDate(startDate);
        educationHistory.setEndDate(endDate);

        return educationHistoryRepository.save(educationHistory);
    }
}
