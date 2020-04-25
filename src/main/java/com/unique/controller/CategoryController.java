package com.unique.controller;

import com.unique.exception.ResourceNotFoundException;
import com.unique.model.Category;
import com.unique.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class CategoryController {
    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/categories/{categoryId}")
    public ResponseEntity<Category> getCategory(@PathVariable long categoryId) throws ResourceNotFoundException {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category not found for this id: " + categoryId));
        return ResponseEntity.ok().body(category);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @PutMapping("/categories/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable(value = "id") long categoryId, @Valid @RequestBody Category categoryUpdate) throws ResourceNotFoundException {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category not found for this id: " + categoryId));
        category.setProducts(category.getProducts());
        return ResponseEntity.ok(categoryRepository.save(category));
    }
}
