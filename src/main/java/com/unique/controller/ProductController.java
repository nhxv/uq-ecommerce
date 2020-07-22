package com.unique.controller;

import com.unique.exception.ItemExistException;
import com.unique.exception.ResourceNotFoundException;
import com.unique.model.Account;
import com.unique.model.Product;
import com.unique.repository.AccountRepository;
import com.unique.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {
    private ProductRepository productRepository;
    private AccountRepository accountRepository;

    @Autowired
    public ProductController(ProductRepository productRepository, AccountRepository accountRepository) {
        this.productRepository = productRepository;
        this.accountRepository = accountRepository;
    }

    @GetMapping("/products/pageable")
    public Page<Product> getAllProducts(@RequestParam(name = "page", defaultValue = "0") String pageParam,
                                        @RequestParam(name = "size", defaultValue = "5") String sizeParam) {
        int page = Integer.parseInt(pageParam);
        int size = Integer.parseInt(sizeParam);
        Pageable pageable = PageRequest.of(page, size, Sort.by("dateCreated").descending());
        return productRepository.findAll(pageable);
    }

    @GetMapping("/products")
    public List<Product> getProductList() {
        List<Product> products = this.productRepository.findAll();
        Collections.reverse(products);
        return products;
    }

    @GetMapping("/products/findByCategoryId")
    public Page<Product> findProductByCategory(@RequestParam(name = "id") long id,
                                               @RequestParam(name = "page") String pageParam,
                                               @RequestParam(name = "size") String sizeParam) {
        int page = Integer.parseInt(pageParam);
        int size = Integer.parseInt(sizeParam);
        Pageable pageable = PageRequest.of(page, size, Sort.by("dateCreated").descending());
        Page<Product> products = this.productRepository.findByCategoryId(id, pageable);
        return products;
    }

    @GetMapping("/products/findByNameContaining")
    public Page<Product> findProductByNameContain(@RequestParam(name = "name") String name,
                                              @RequestParam(name = "page") String pageParam,
                                              @RequestParam(name = "size") String sizeParam) {
        int page = Integer.parseInt(pageParam);
        int size = Integer.parseInt(sizeParam);
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = this.productRepository.findByNameContaining(name, pageable);
        return products;
    }

    @GetMapping("/products/findByName")
    public ResponseEntity<Product> findProductByName(@RequestParam(name = "name") String name) throws ResourceNotFoundException {
        Product product = this.productRepository.findByName(name);
        if (product == null) {
            throw new ResourceNotFoundException("Resource not found for this name" + name);
        } else {
            return ResponseEntity.ok().body(product);
        }
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<Product> getProduct(@PathVariable long productId) throws ResourceNotFoundException {
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found for id: " + productId));
        return ResponseEntity.ok().body(product);
    }

    @GetMapping("/products/stats")
    public List<Long> getProductStats() {
        long productCount;
        long productAvailableCount = 0;
        List<Product> products = this.productRepository.findAll();
        productCount = products.size();
        for (Product product : products) {
            if (product.isAvailable()) {
                productAvailableCount++;
            }
        }
        List<Long> result = new ArrayList<>();
        result.add(productCount);
        result.add(productAvailableCount);
        return result;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @PostMapping("/products")
    public Product createProduct(@Valid @RequestBody Product product) throws ItemExistException {
        if (this.productRepository.findByName(product.getName()) == null) {
            return productRepository.save(product);
        } else {
            throw new ItemExistException("This product name already exists");
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @PostMapping("/products/by-staff")
    public Product createByStaff(@RequestParam("staffEmail") String staffParam, @Valid @RequestBody Product product) throws ItemExistException {
        if (this.productRepository.findByName(product.getName()) == null) {
            Account staff = this.accountRepository.findByEmail(staffParam);
            staff.setProductWork(staff.getProductWork() + 1);
            this.accountRepository.save(staff);
            return this.productRepository.save(product);
        } else {
            throw new ItemExistException("This product name already exists");
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable(value="id") Long productId, @Valid @RequestBody Product productUpdate) throws ResourceNotFoundException, ItemExistException {
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found for this id: " + productId));
        if (productRepository.findByName(productUpdate.getName()) == null || product.getName().equals(productUpdate.getName())) {
            product.setName(productUpdate.getName());
            product.setDescription(productUpdate.getDescription());
            product.setUnitPrice(productUpdate.getUnitPrice());
            product.setAvailable(productUpdate.isAvailable());
            return ResponseEntity.ok(productRepository.save(product));
        } else {
            throw new ItemExistException("This product name already exists");
        }
    }
}
