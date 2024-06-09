package com.capstone.studentplacementplatform.controller;

import com.capstone.studentplacementplatform.model.Internship;
import com.capstone.studentplacementplatform.service.InternshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@Validated
@RequestMapping("/api/v1/internships")
public class InternshipController {

    @Autowired
    private InternshipService internshipService;

    @GetMapping
    public ResponseEntity<List<Internship>> getAllInternships() {
        List<Internship> internships = internshipService.getAllInternships();
        return new ResponseEntity<>(internships, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Internship> getInternshipById(@PathVariable Long id) {
        Optional<Internship> internship = internshipService.getInternshipById(id);
        return internship.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<?> createInternship(@RequestBody Internship internship) {
        try {
            Internship savedInternship = internshipService.saveInternship(internship);
            return new ResponseEntity<>(savedInternship, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Internship> updateInternship(@PathVariable Long id, @RequestBody Internship internshipDetails) {
        Optional<Internship> internshipOptional = internshipService.getInternshipById(id);

        if (internshipOptional.isPresent()) {
            Internship internshipToUpdate = internshipOptional.get();
            internshipToUpdate.setJobTitle(internshipDetails.getJobTitle());
            internshipToUpdate.setDescription(internshipDetails.getDescription());
            internshipToUpdate.setLocation(internshipDetails.getLocation());
            internshipToUpdate.setDuration(internshipDetails.getDuration());
            internshipToUpdate.setQualifications(internshipDetails.getQualifications());
            internshipToUpdate.setApplicationDeadline(internshipDetails.getApplicationDeadline());
            internshipToUpdate.setCompany(internshipDetails.getCompany());

            Internship updatedInternship = internshipService.saveInternship(internshipToUpdate);
            return new ResponseEntity<>(updatedInternship, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInternship(@PathVariable Long id) {
        Optional<Internship> internshipOptional = internshipService.getInternshipById(id);

        if (internshipOptional.isPresent()) {
            internshipService.deleteInternship(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
