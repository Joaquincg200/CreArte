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
import com.example.CreArte.Request.UpdateStatusRequest;
import com.example.CreArte.exception.ExceptionChangeOrderStatus;
import com.example.CreArte.exception.ExceptionOrderNotFound;
import com.example.CreArte.exception.ExceptionUsersNotFound;
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

        Optional<Users> usersOptional = repositoryUsers.findById(request.getIdUser());
        if(usersOptional.isPresent()){
            Users user = usersOptional.get();
            order.setIdUser(user);
        }else{
            throw new ExceptionUsersNotFound("Usuario no encontrado con id: " + request.getIdUser());
        }

        List<Products> products = new ArrayList<>();
        for (Long id : request.getIdProducts()) {
            Optional<Products> productsOptional = repositoryProducts.findById(id);
            if(productsOptional.isPresent()){
                Products product = productsOptional.get();
                products.add(product);
            } else{
                throw new ExceptionOrderNotFound("Producto no encontrado con id: " + id);
            }
        }
        order.setIdProducts(products);

        double total = 00.0;

        for (OrderItemsRequest item: request.getOrderItems()) {
            Optional<Products> productsOptional = this.repositoryProducts.findById(item.getProductId());

            if(productsOptional.isPresent()){
                Products products1 = productsOptional.get();
                total += products1.getPrice() * item.getQuantity();

                if(products1.getStock() >= item.getQuantity()){
                    int stock = products1.getStock() - item.getQuantity();
                    products1.setStock(stock);
                    repositoryProducts.save(products1);
                }
            } else{
                throw new ExceptionOrderNotFound("Producto no encontrado con id: " + item.getProductId());
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
        throw new ExceptionOrderNotFound("No se ha encontrado el pedido con la id " + id);
    }

    @Override
    public List<OrdersDTO> getOrderByUserId(Long userId) {
        List<Orders> orders = this.repositoryOrders.findByUserId(userId);
        return this.mapperOrders.ordersToOrdersDTO(orders);
    }

    @Override
    public OrdersDTO changeOrderStatus(Long id, UpdateStatusRequest request) {
         Optional<Orders> optionalOrder = this.repositoryOrders.findById(id);
         if (optionalOrder.isPresent()){
             Orders order = optionalOrder.get();
             if("CANCELADO".equals(order.getStatus()) || "ENVIADO".equals(order.getStatus())){
                 throw new ExceptionChangeOrderStatus("No se ha podido modificar el estado del pedidox porque ha sido enviado o cancelado");
             }
             order.setStatus(request.getStatus());
             Orders updatedOrder = this.repositoryOrders.save(order);
             return this.mapperOrders.orderToOrderDTO(updatedOrder);
         }
        throw new ExceptionOrderNotFound("No se ha encontrado ningun pedido con la id " + id);
    }

    @Override
    public OrdersDTO cancelOrder(Long id) {
        Optional<Orders> optionalOrder = this.repositoryOrders.findById(id);
        if (optionalOrder.isPresent()){
            Orders order = optionalOrder.get();
            if ("ENVIADO".equals(order.getStatus()) || "CANCELADO".equals(order.getStatus())){
                throw new ExceptionChangeOrderStatus("No se ha podido cancelar el pedido porque se ha enviado o cancelado");
            }
            for(Products product: order.getIdProducts()){
                product.setStock((product.getStock()) + 1);
                repositoryProducts.save(product);
            }

            order.setStatus(StatusEnum.CANCELADO);

            Orders cancelledOrder = this.repositoryOrders.save(order);
            return this.mapperOrders.orderToOrderDTO(cancelledOrder);
        }
        throw new ExceptionOrderNotFound("No se ha econtrado el pedido con la id " + id);
    }
}
