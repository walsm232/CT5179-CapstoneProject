package com.capstone.studentplacementplatform.controller;

import com.capstone.studentplacementplatform.model.EducationHistory;
import com.capstone.studentplacementplatform.service.EducationHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/education")
public class EducationHistoryController {

    @Autowired
    private EducationHistoryService educationHistoryService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getEducationHistoryByUserId(@PathVariable Long userId) {
        List<EducationHistory> educationHistoryList = educationHistoryService.findByUserId(userId);
        return ResponseEntity.ok(educationHistoryList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEducationHistoryById(@PathVariable Long id) {
        Optional<EducationHistory> educationHistoryOptional = educationHistoryService.findById(id);
        return educationHistoryOptional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> addEducationHistory(@RequestBody EducationHistory educationHistory) {
        EducationHistory savedEducationHistory = educationHistoryService.save(educationHistory);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEducationHistory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEducationHistory(@PathVariable Long id, @RequestBody EducationHistory educationHistoryDetails) {
        Optional<EducationHistory> educationHistoryOptional = educationHistoryService.findById(id);
        if (educationHistoryOptional.isPresent()) {
            EducationHistory educationHistory = educationHistoryOptional.get();
            educationHistory.setInstitutionName(educationHistoryDetails.getInstitutionName());
            educationHistory.setDegree(educationHistoryDetails.getDegree());
            educationHistory.setMajor(educationHistoryDetails.getMajor());
            educationHistory.setStartDate(educationHistoryDetails.getStartDate());
            educationHistory.setEndDate(educationHistoryDetails.getEndDate());
            EducationHistory updatedEducationHistory = educationHistoryService.save(educationHistory);
            return ResponseEntity.ok(updatedEducationHistory);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEducationHistory(@PathVariable Long id) {
        educationHistoryService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
