package com.capstone.studentplacementplatform.service;

import com.capstone.studentplacementplatform.model.EducationHistory;
import com.capstone.studentplacementplatform.repository.EducationHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EducationHistoryService {

    @Autowired
    private EducationHistoryRepository educationHistoryRepository;

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
}
