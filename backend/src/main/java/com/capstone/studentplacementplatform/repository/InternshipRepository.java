package com.capstone.studentplacementplatform.repository;

import com.capstone.studentplacementplatform.model.Internship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InternshipRepository extends JpaRepository<Internship, Long> {
}
