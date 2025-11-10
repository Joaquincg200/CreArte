package com.example.CreArte.Controller;

import com.example.CreArte.Dto.ReviewsDTO;
import com.example.CreArte.Request.CreateReviewRequest;
import com.example.CreArte.Service.ReviewsServiceImpls;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReviewsController {
    private ReviewsServiceImpls reviewsServiceImpls;

    public ReviewsController(ReviewsServiceImpls reviewsServiceImpls) {
        this.reviewsServiceImpls = reviewsServiceImpls;
    }

    @PostMapping("/api/reviews/new")
    @Operation(summary = "Crear una valoracion para un producto")
    public ResponseEntity<ReviewsDTO> createReview(@RequestBody CreateReviewRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.reviewsServiceImpls.createReview(request));
    }

    @GetMapping("/api/reviews/product/{productId}")
    @Operation(summary = "Obtener valoraciones por ID de producto")
    public ResponseEntity<List<ReviewsDTO>> getReviewsByProductId(@PathVariable long productId) {
        return ResponseEntity.status(HttpStatus.OK).body(this.reviewsServiceImpls.getReviewsByProductId(productId));
    }

    @GetMapping("/api/reviews/user/{userId}")
    @Operation(summary = "Obtener valoraciones por ID de usuario")
    public ResponseEntity<List<ReviewsDTO>> getReviewsByUserId(@PathVariable long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(this.reviewsServiceImpls.getReviewsByUserId(userId));
    }

    @DeleteMapping("/api/reviews/delete/{reviewId}")
    @Operation(summary = "Eliminar una valoracion por ID")
    public ResponseEntity<ReviewsDTO> deleteReview(@PathVariable long reviewId) {
        return ResponseEntity.status(HttpStatus.OK).body(this.reviewsServiceImpls.deleteReview(reviewId));
    }

}
