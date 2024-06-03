package com.capstone.studentplacementplatform.service;

import com.capstone.studentplacementplatform.model.Company;
import com.capstone.studentplacementplatform.model.Internship;
import com.capstone.studentplacementplatform.repository.CompanyRepository;
import com.capstone.studentplacementplatform.repository.InternshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class InternshipService {

    @Autowired
    private InternshipRepository internshipRepository;

    @Autowired
    private CompanyRepository companyRepository;

    public List<Internship> getAllInternships() {
        return internshipRepository.findAll();
    }

    public Optional<Internship> getInternshipById(Long id) {
        return internshipRepository.findById(id);
    }

    @Transactional
    public Internship saveInternship(Internship internship) {
        if (internship.getCompany() == null || internship.getCompany().getCompanyId() == null) {
            throw new RuntimeException("Company information is required");
        }

        Optional<Company> companyOptional = companyRepository.findById(internship.getCompany().getCompanyId());
        if (companyOptional.isPresent()) {
            internship.setCompany(companyOptional.get());
            return internshipRepository.save(internship);
        } else {
            throw new RuntimeException("Company not found");
        }
    }

    public void deleteInternship(Long id) {
        internshipRepository.deleteById(id);
    }
}
