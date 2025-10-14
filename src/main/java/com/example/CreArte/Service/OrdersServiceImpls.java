package com.example.CreArte.Service;

import com.example.CreArte.Dto.OrdersDTO;
import com.example.CreArte.Entity.Orders;
import com.example.CreArte.Entity.Products;
import com.example.CreArte.Entity.Users;
import com.example.CreArte.Enums.StatusEnum;
import com.example.CreArte.Mapper.IMapperOrders;
import com.example.CreArte.Repository.IRepositoryOrders;
import com.example.CreArte.Repository.IRepositoryProducts;
import com.example.CreArte.Repository.IRepositoryUsers;
import com.example.CreArte.Request.CreateOrderRequest;
import com.example.CreArte.Request.OrderItemsRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrdersServiceImpls implements IOrdersServiceImpls{
    private IRepositoryOrders repositoryOrders;
    private IMapperOrders mapperOrders;
    private IRepositoryUsers repositoryUsers;
    private IRepositoryProducts repositoryProducts;

    public OrdersServiceImpls(IRepositoryOrders repositoryOrders, IMapperOrders mapperOrders,IRepositoryUsers repositoryUsers, IRepositoryProducts repositoryProducts) {
        this.repositoryOrders = repositoryOrders;
        this.mapperOrders = mapperOrders;
        this.repositoryUsers = repositoryUsers;
        this.repositoryProducts = repositoryProducts;
    }

    @Override
    public OrdersDTO createOrder(CreateOrderRequest request) {
        Orders order = new Orders();

        Users user = repositoryUsers.findById(request.getIdUser()).orElseThrow();
        order.setIdUser(user);

        List<Products> products = new ArrayList<>();
        for (Long id : request.getIdProducts()) {
            Products product = repositoryProducts.findById(id).orElseThrow();
            products.add(product);
        }

        order.setIdProducts(products);

        double total = 00.0;
        for (OrderItemsRequest item: request.getOrderItems()) {
            Products products1 = this.repositoryProducts.findById(item.getProductId()).orElseThrow();
            if (products1.getStock() < item.getQuantity()) {
                return null;
            }
            if(products1.getStock() > item.getQuantity()){
                int stock = products1.getStock() -item.getQuantity();
                products1.setStock(stock);
            }
        }

        order.setTotal(total);

        order.setStatus(StatusEnum.PENDIENTE);
        order.setOrder_Date(LocalDate.now());

        Orders saved = repositoryOrders.save(order);

        Orders loaded = repositoryOrders.findById(saved.getId()).orElseThrow();

        return mapperOrders.orderToOrderDTO(loaded);
    }

    @Override
    public OrdersDTO getOrderById(Long id) {
        Optional<Orders> order = this.repositoryOrders.findById(id);
        if (order.isPresent()){
            return this.mapperOrders.orderToOrderDTO(order.get());
        }
        return null;
    }

    @Override
    public List<OrdersDTO> getOrderByUserId(Long userId) {
        List<Orders> orders = this.repositoryOrders.findByIdUser_Id(userId);
        return this.mapperOrders.ordersToOrdersDTO(orders);
    }

    @Override
    public OrdersDTO changeOrderStatus(Long id, CreateOrderRequest request) {
         Optional<Orders> optionalOrder = this.repositoryOrders.findById(id);
         if (optionalOrder.isPresent()){
             Orders order = optionalOrder.get();
             if("CANCELADO".equals(order.getStatus()) || "ENVIADO".equals(order.getStatus())){
                 return null;
             }
             order.setStatus(request.getStatus());
             Orders updatedOrder = this.repositoryOrders.save(order);
             return this.mapperOrders.orderToOrderDTO(updatedOrder);
         }
        return null;
    }

    @Override
    public OrdersDTO cancelOrder(Long id, CreateOrderRequest request) {
        Optional<Orders> optionalOrder = this.repositoryOrders.findById(id);
        if (optionalOrder.isPresent()){
            Orders order = optionalOrder.get();
            if ("ENVIADO".equals(order.getStatus())){
                return null;
            }
            order.setStatus(StatusEnum.CANCELADO);
            for (OrderItemsRequest item: request.getOrderItems()) {
                Products products = this.repositoryProducts.findById(item.getProductId()).orElseThrow();
                products.setStock(products.getStock() + item.getQuantity());
                this.repositoryProducts.save(products);
            }
            Orders cancelledOrder = this.repositoryOrders.save(order);
            return this.mapperOrders.orderToOrderDTO(cancelledOrder);
        }
        return null;
    }
}
