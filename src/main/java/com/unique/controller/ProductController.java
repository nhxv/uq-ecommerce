package com.unique.controller;

import com.unique.exception.ResourceNotFoundException;
import com.unique.model.Image;
import com.unique.model.Product;
import com.unique.repository.CategoryRepository;
import com.unique.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {
    private ProductRepository productRepository;

    @Autowired
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/products/pageable")
    public Page<Product> getAllProducts(@RequestParam(name = "page", defaultValue = "0") String pageParam, @RequestParam(name = "size", defaultValue = "5") String sizeParam) {
        int page = Integer.parseInt(pageParam);
        int size = Integer.parseInt(sizeParam);
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
    }

    @GetMapping("/products")
    public List<Product> getProductList() {
        return this.productRepository.findAll();
    }

    @GetMapping("/products/findByCategoryId")
    public Page<Product> findProductByCategory(@RequestParam(name = "id") long id,
                                               @RequestParam(name = "page") String pageParam,
                                               @RequestParam(name = "size") String sizeParam) {
        int page = Integer.parseInt(pageParam);
        int size = Integer.parseInt(sizeParam);
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = this.productRepository.findByCategoryId(id, pageable);
        return products;
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<Product> getProduct(@PathVariable long productId) throws ResourceNotFoundException {
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found for id: " + productId));
        List<Image> compressedImages = product.getImages();
        List<Image> decompressedImages = new ArrayList<>();
        for (Image img : compressedImages) {
            decompressedImages.add(new Image(img.getId(), img.getName(), img.getType(), decompressBytes(img.getPicByte())));
        }
        product.setImages(decompressedImages);
        return ResponseEntity.ok().body(product);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @PostMapping("/products")
    public Product createProduct(@Valid @RequestBody Product product) {
        return productRepository.save(product);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable(value="id") Long productId, @Valid @RequestBody Product productUpdate) throws ResourceNotFoundException {
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found for this id: " + productId));
        product.setCategory(productUpdate.getCategory());
        product.setImages(productUpdate.getImages());
        product.setColors(productUpdate.getColors());
        product.setSizes(productUpdate.getSizes());
        product.setName(productUpdate.getName());
        product.setDescription(productUpdate.getDescription());
        product.setUnitPrice(productUpdate.getUnitPrice());
        return ResponseEntity.ok(productRepository.save(product));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/products/{id}")
    public Map<String, Boolean> deleteProduct(@PathVariable(value = "id") Long productId) throws ResourceNotFoundException {
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found for this id: " + productId));
        productRepository.delete(product);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    // compress the image bytes before storing it in the database
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();
    }
    // uncompress the image bytes before returning it to the angular application
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }
}
