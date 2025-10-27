package com.example.CreArte.Mapper;

import com.example.CreArte.Dto.ReviewsDTO;
import com.example.CreArte.Entity.Reviews;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IMapperReviews {
    @Mapping(target = "userId", source = "userId.id")
    @Mapping(target = "productId", source = "productId.id")
    ReviewsDTO reviewToReviewDTO(Reviews review);
    List<ReviewsDTO> reviewsToReviewsDTO(List<Reviews> reviews);
}
