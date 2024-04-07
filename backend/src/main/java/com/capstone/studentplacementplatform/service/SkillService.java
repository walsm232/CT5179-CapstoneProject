package com.capstone.studentplacementplatform.service;

import com.capstone.studentplacementplatform.model.Skill;
import com.capstone.studentplacementplatform.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    public List<Skill> findByUserId(Long userId) {
        return skillRepository.findByUserId(userId);
    }

    public Skill addSkillForUser(Long userId, Skill skill) {
        skill.setUserId(userId);
        return skillRepository.save(skill);
    }

    public Skill save(Skill skill) {
        return skillRepository.save(skill);
    }

    public Optional<Skill> findById(Long id) {
        return skillRepository.findById(id);
    }

    public void deleteById(Long id) {
        skillRepository.deleteById(id);
    }
}
