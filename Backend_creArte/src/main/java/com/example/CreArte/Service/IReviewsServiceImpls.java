package com.example.CreArte.Service;

import com.example.CreArte.Dto.ReviewsDTO;
import com.example.CreArte.Request.CreateReviewRequest;

import java.util.List;

public interface IReviewsServiceImpls {
    ReviewsDTO createReview(CreateReviewRequest request);
    List<ReviewsDTO> getReviewsByProductId(Long productId);
    List<ReviewsDTO> getReviewsByUserId(Long userId);
    ReviewsDTO deleteReview(Long reviewId);
}
