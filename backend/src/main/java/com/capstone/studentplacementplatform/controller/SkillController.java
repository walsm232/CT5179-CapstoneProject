package com.capstone.studentplacementplatform.controller;

import com.capstone.studentplacementplatform.model.Skill;
import com.capstone.studentplacementplatform.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getSkillById(@PathVariable Long id) {
        Optional<Skill> skillOptional = skillService.findById(id);
        return skillOptional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getSkillsByUserId(@PathVariable Long userId) {
        List<Skill> skills = skillService.findByUserId(userId);
        return ResponseEntity.ok(skills);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<?> addSkillForUser(@PathVariable Long userId, @RequestBody Skill skill) {
        Skill savedSkill = skillService.addSkillForUser(userId, skill);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSkill);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSkill(@PathVariable Long id, @RequestBody Skill skillDetails) {
        Optional<Skill> skillOptional = skillService.findById(id);
        if (skillOptional.isPresent()) {
            Skill skill = skillOptional.get();
            skill.setSkillName(skillDetails.getSkillName());
            Skill updatedSkill = skillService.save(skill);
            return ResponseEntity.ok(updatedSkill);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSkill(@PathVariable Long id) {
        skillService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
