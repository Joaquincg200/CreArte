package com.example.CreArte.Service;

import com.example.CreArte.Dto.ReviewsDTO;
import com.example.CreArte.Entity.Products;
import com.example.CreArte.Entity.Reviews;
import com.example.CreArte.Entity.Users;
import com.example.CreArte.Mapper.IMapperReviews;
import com.example.CreArte.Repository.IRepositoryOrders;
import com.example.CreArte.Repository.IRepositoryProducts;
import com.example.CreArte.Repository.IRepositoryReviews;
import com.example.CreArte.Repository.IRepositoryUsers;
import com.example.CreArte.Request.CreateReviewRequest;
import com.example.CreArte.exception.ExceptionReviewsNotFound;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewsServiceImpls implements IReviewsServiceImpls{
    private IMapperReviews mapperReviews;
    private IRepositoryOrders repositoryOrders;
    private IRepositoryReviews repositoryReviews;
    private IRepositoryUsers repositoryUsers;
    private IRepositoryProducts repositoryProducts;

    public ReviewsServiceImpls(IMapperReviews mapperReviews, IRepositoryOrders repositoryOrders, IRepositoryReviews repositoryReviews, IRepositoryUsers repositoryUsers, IRepositoryProducts repositoryProducts) {
        this.mapperReviews = mapperReviews;
        this.repositoryOrders = repositoryOrders;
        this.repositoryReviews = repositoryReviews;
        this.repositoryUsers = repositoryUsers;
        this.repositoryProducts = repositoryProducts;

    }

    @Override
    public ReviewsDTO createReview(CreateReviewRequest request) {
        Optional<Users> usersOptional = repositoryUsers.findById(request.getUserId());

        Optional<Products> productsOptional = repositoryProducts.findById(request.getProductId());

        Reviews review = new Reviews();
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        if(usersOptional.isPresent()){
            Users user = usersOptional.get();
            review.setUserId(user);
        }
        if(productsOptional.isPresent()){
            Products product = productsOptional.get();
            review.setProductId(product);
        }

        review.setCreatedAt(LocalDateTime.now());

        boolean hasPurchased = repositoryOrders.existBoughtProduct(request.getUserId(), request.getProductId());
        review.setVerifiedPurchase(hasPurchased);

        Reviews savedReview = repositoryReviews.save(review);
        return this.mapperReviews.reviewToReviewDTO(savedReview);
    }

    @Override
    public List<ReviewsDTO> getReviewsByProductId(Long productId) {
        List<Reviews> listaReviewProducts= repositoryReviews.findByProductId_Id(productId);
        return this.mapperReviews.reviewsToReviewsDTO(listaReviewProducts);
    }

    @Override
    public List<ReviewsDTO> getReviewsByUserId(Long userId) {
        List<Reviews> ListaReviewUsers= repositoryReviews.findByUserId_Id(userId);
        return this.mapperReviews.reviewsToReviewsDTO(ListaReviewUsers);
    }

    @Override
    public ReviewsDTO deleteReview(Long reviewId) {
        Optional<Reviews> reviewOptional = repositoryReviews.findById(reviewId);
        if (reviewOptional.isPresent()) {
            Reviews review = reviewOptional.get();
            repositoryReviews.delete(review);
            return this.mapperReviews.reviewToReviewDTO(review);
        }
        throw new ExceptionReviewsNotFound("No se ha encontrado ningun comentario con esa id " + reviewId);
    }


}
