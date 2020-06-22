package com.tmall.common.base;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.AnnotationAwareOrderComparator;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.SmartValidator;
import org.springframework.validation.Validator;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.List;

@Component
public class CompositeValidator implements SmartValidator {
	@Autowired
	private List<Validator> validators = Collections.emptyList();

	@PostConstruct
	public void init() {
		Collections.sort(validators, AnnotationAwareOrderComparator.INSTANCE);
	}

	@Override
	public boolean supports(Class<?> clazz) {
		for (Validator validator : validators) {
			if (validator.supports(clazz)) {
				return true;
			}
		}
		return false;
	}

	@Override
	public void validate(Object target, Errors errors) {
		validate(target, errors, javax.validation.groups.Default.class);
	}

	@Override
	public void validate(Object target, Errors errors, Object... validationHints) {
		Class<?> clazz = target.getClass();

		for (Validator validator : validators) {
			if (validator.supports(clazz)) {
				if (validator instanceof SmartValidator) {
					((SmartValidator) validator).validate(target, errors, validationHints);
				} else {
					validator.validate(target, errors);
				}
			}
		}
	}
}