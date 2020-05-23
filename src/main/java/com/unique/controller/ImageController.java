package com.unique.controller;

import com.unique.exception.ResourceNotFoundException;
import com.unique.model.Image;
import com.unique.model.Product;
import com.unique.repository.ImageRepository;
import com.unique.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@RestController
@CrossOrigin(origins = "*")
public class ImageController {
    private ProductRepository productRepository;
    private static final String UPLOAD_PATH = "src/main/resources/upload-images";
    
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
            Image img = new Image(file.getOriginalFilename(), file.getContentType(), "http://localhost:8080/images/" + file.getOriginalFilename());
            images.add(img);
        }
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found for this id: " + productId));
        product.setImages(images);
        productRepository.save(product);
        return ResponseEntity.ok(images);
    }

    @GetMapping(value = "/images/{imageName}",  produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImage(@PathVariable("imageName") String imageName) throws IOException {
        File imgFile = new File(UPLOAD_PATH + "/" + imageName);
        byte[] bytes = Files.readAllBytes(imgFile.toPath());
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(bytes);
    }
}

