package com.capstone.studentplacementplatform.repository;

import com.capstone.studentplacementplatform.model.EducationHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EducationHistoryRepository extends JpaRepository<EducationHistory, Long> {

    List<EducationHistory> findByUserId(Long userId);
}
