package com.capstone.studentplacementplatform.repository;

import com.capstone.studentplacementplatform.model.UserSkills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserSkillRepository extends JpaRepository<UserSkills, Long> {
    List<UserSkills> findByUserId(Long userId);
}
