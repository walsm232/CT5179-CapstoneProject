package com.capstone.studentplacementplatform.controller;

import com.capstone.studentplacementplatform.model.Company;
import com.capstone.studentplacementplatform.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping
    public ResponseEntity<List<Company>> getAllCompanies() {
        List<Company> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(companies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Long id) {
        Optional<Company> companyOptional = companyService.getCompanyById(id);
        return companyOptional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Company> createCompany(@RequestBody Company company) {
        Company savedCompany = companyService.saveCompany(company);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCompany);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable Long id, @RequestBody Company companyDetails) {
        Optional<Company> companyOptional = companyService.getCompanyById(id);
        if (companyOptional.isPresent()) {
            Company company = companyOptional.get();
            company.setCompanyName(companyDetails.getCompanyName());
            company.setIndustry(companyDetails.getIndustry());
            company.setLocation(companyDetails.getLocation());
            company.setWebsite(companyDetails.getWebsite());
            Company updatedCompany = companyService.saveCompany(company);
            return ResponseEntity.ok(updatedCompany);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCompany(@PathVariable Long id) {
        companyService.deleteCompany(id);
        return ResponseEntity.noContent().build();
    }
}
