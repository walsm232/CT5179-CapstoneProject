package com.capstone.studentplacementplatform.dto;

import java.util.Date;

public class EducationHistoryRequest {
    private Long userId;
    private String institutionName;
    private String degree;
    private String major;
    private Date startDate;
    private Date endDate;

    // Constructors
    public EducationHistoryRequest() {}

    public EducationHistoryRequest(Long userId, String institutionName, String degree, String major, Date startDate, Date endDate) {
        this.userId = userId;
        this.institutionName = institutionName;
        this.degree = degree;
        this.major = major;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getInstitutionName() {
        return institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}

