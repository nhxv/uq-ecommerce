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
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@RestController
@CrossOrigin(origins = "*")
public class ImageController {
    private ProductRepository productRepository;
    private static final String UPLOAD_PATH = "upload";
    
    @Autowired
    public ImageController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @PostMapping("/images/{productId}")
    public ResponseEntity<List<Image>> uploadImage(@RequestParam("imageFile") MultipartFile[] files, @PathVariable long productId) throws IOException, ResourceNotFoundException {
        List<Image> compressedImages = new ArrayList<>();
        for (MultipartFile file : files) {
            String imagePath = UPLOAD_PATH + "/" + file.getOriginalFilename();
            Path path = Paths.get(imagePath);
            Files.write(path, file.getBytes());
            Image img = new Image(file.getOriginalFilename(), file.getContentType(), compressBytes(file.getBytes()));
            compressedImages.add(img);
        }
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found for this id: " + productId));
        product.setImages(compressedImages);
        productRepository.save(product);
        return ResponseEntity.ok(compressedImages);
    }

    @GetMapping("/images/{productId}")
    public List<Image> getImages(@PathVariable long productId) throws IOException, ResourceNotFoundException {
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found for this id: " + productId));
        List<Image> compressedImages = product.getImages();
        List<Image> decompressedImages = new ArrayList<>();
        for (Image image : compressedImages) {
            decompressedImages.add(new Image(image.getId(), image.getName(), image.getType(), decompressBytes(image.getPicByte())));
        }
        return decompressedImages;
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

