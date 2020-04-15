package com.unique.controller;

import com.unique.exception.ResourceNotFoundException;
import com.unique.model.ProductCategory;
import com.unique.repository.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class ProductCategoryController {
    private ProductCategoryRepository categoryRepository;

    @Autowired
    public ProductCategoryController(ProductCategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/categories/views")
    public List<ProductCategory> getAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/categories/views/{categoryId}")
    public ResponseEntity<ProductCategory> getProduct(@PathVariable long categoryId) throws ResourceNotFoundException {
        ProductCategory category = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("ProductCategory not found for this id: " + categoryId));
        return ResponseEntity.ok().body(category);
    }

    @PostMapping("/categories")
    public ProductCategory createCategory(@Valid @RequestBody ProductCategory category) {
        return categoryRepository.save(category);
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<ProductCategory> updateCategory(@PathVariable(value="id") Long categoryId, @Valid @RequestBody ProductCategory productUpdate) throws ResourceNotFoundException {
        ProductCategory category = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category not found for this id: " + categoryId));
        category.setName(productUpdate.getName());
        return ResponseEntity.ok(categoryRepository.save(category));
    }

    @DeleteMapping("/categories/{id}")
    public Map<String, Boolean> deleteProduct(@PathVariable(value = "id") Long categoryId) throws ResourceNotFoundException {
        ProductCategory category = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category not found for this id: " + categoryId));
        categoryRepository.delete(category);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
