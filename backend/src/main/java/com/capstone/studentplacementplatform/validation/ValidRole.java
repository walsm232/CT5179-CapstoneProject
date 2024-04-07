package com.capstone.studentplacementplatform.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ValidRoleValidator.class)
@Documented
public @interface ValidRole {
    String message() default "Role MUST be one of 'STUDENT', 'PLACEMENT OFFICER', or 'RECRUITER'";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
