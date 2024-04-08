package com.capstone.studentplacementplatform.repository;

import com.capstone.studentplacementplatform.model.UserEducationHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserEducationHistoryRepository extends JpaRepository<UserEducationHistory, Long> {
    List<UserEducationHistory> findByUserId(Long userId);
}
