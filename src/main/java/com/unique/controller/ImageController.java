package com.unique.controller;

import com.unique.exception.ResourceNotFoundException;
import com.unique.model.Image;
import com.unique.model.Product;
import com.unique.repository.ImageRepository;
import com.unique.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ImageController {
    private ProductRepository productRepository;
    private static final String UPLOAD_PATH = "frontend/src/assets/ui-assets/images/upload";
    
    @Autowired
    public ImageController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @PostMapping("/images/{productId}")
    public ResponseEntity<List<Image>> uploadImage(@RequestParam("imageFile") MultipartFile[] files, @PathVariable long productId) throws IOException, ResourceNotFoundException {
        List<Image> images = new ArrayList<>();
        for (MultipartFile file : files) {
            String imagePath = UPLOAD_PATH + "/" + file.getOriginalFilename();
            Path path = Paths.get(imagePath);
            Files.write(path, file.getBytes());
            Image img = new Image(file.getOriginalFilename(), file.getContentType(), slicePath(imagePath));
            images.add(img);
        }
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found for this id: " + productId));
        product.setImages(images);
        productRepository.save(product);
        return ResponseEntity.ok(images);
    }

    private static String slicePath(String path) {
        int index = path.indexOf("assets");
        String imagePath = path.substring(index);
//        imagePath = "../../../../" + imagePath;
        return imagePath;
    }
}

