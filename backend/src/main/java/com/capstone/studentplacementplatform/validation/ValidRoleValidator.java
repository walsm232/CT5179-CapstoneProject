package com.capstone.studentplacementplatform.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Set;


public class ValidRoleValidator implements ConstraintValidator<ValidRole, String> {

    private static final Set<String> ALLOWED_ROLES = Set.of("STUDENT", "PLACEMENT OFFICER", "RECRUITER");

    @Override
    public void initialize(ValidRole constraintAnnotation) {}

    @Override
    public boolean isValid(String role, ConstraintValidatorContext context) {
        if (role == null) {
            return false;
        }
        return ALLOWED_ROLES.contains(role.toUpperCase());
    }
}

