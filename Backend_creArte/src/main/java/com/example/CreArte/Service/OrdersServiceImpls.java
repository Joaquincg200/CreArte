package com.example.CreArte.Service;

import com.example.CreArte.Dto.OrdersDTO;
import com.example.CreArte.Entity.OrderItem;
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
import java.util.stream.Collectors;

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

        // 1️⃣ Asignar comprador (buyer)
        Optional<Users> buyerOpt = repositoryUsers.findById(request.getBuyer());
        if (buyerOpt.isPresent()) {
            order.setBuyer(buyerOpt.get());
        } else {
            throw new ExceptionUsersNotFound("Usuario comprador no encontrado con id: " + request.getBuyer());
        }

        // 2️⃣ Asignar vendedor (idUser)
        Optional<Users> sellerOpt = repositoryUsers.findById(request.getIdUser());
        if (sellerOpt.isPresent()) {
            order.setIdUser(sellerOpt.get());
        } else {
            throw new ExceptionUsersNotFound("Vendedor no encontrado con id: " + request.getIdUser());
        }

        // 3️⃣ Crear los OrderItems y actualizar stock
        List<OrderItem> orderItems = new ArrayList<>();
        double total = 0;
        for (OrderItemsRequest itemReq : request.getOrderItems()) {
            Optional<Products> productOpt = repositoryProducts.findById(itemReq.getProductId());
            if (productOpt.isPresent()) {
                Products product = productOpt.get();

                // Crear OrderItem
                OrderItem orderItem = new OrderItem();
                orderItem.setProduct(product);
                orderItem.setQuantity(itemReq.getQuantity());
                orderItem.setOrder(order); // Muy importante: vincula el OrderItem a la orden
                orderItems.add(orderItem);

                // Calcular total
                total += product.getPrice() * itemReq.getQuantity();

                // Actualizar stock
                if (product.getStock() >= itemReq.getQuantity()) {
                    product.setStock(product.getStock() - itemReq.getQuantity());
                    repositoryProducts.save(product);
                } else {
                    throw new ExceptionOrderNotFound("Stock insuficiente para el producto: " + product.getName());
                }
            } else {
                throw new ExceptionOrderNotFound("Producto no encontrado con id: " + itemReq.getProductId());
            }
        }

        // 4️⃣ Asignar los OrderItems a la orden
        order.setItems(orderItems);

        // 5️⃣ Asignar dirección directamente desde el request
        order.setName(request.getName());
        order.setLastname(request.getLastname());
        order.setPhone(request.getPhone());
        order.setAddress(request.getAddress());
        order.setNumber(request.getNumber());
        order.setFloor(request.getFloor());
        order.setCity(request.getCity());
        order.setPostalCode(request.getPostalCode());

        // 6️⃣ Otros datos de la orden
        order.setTotal(total);
        order.setStatus(StatusEnum.PENDIENTE);
        order.setOrder_Date(LocalDate.now());

        // 7️⃣ Guardar la orden
        Orders savedOrder = repositoryOrders.save(order);

        // 8️⃣ Retornar DTO
        return mapperOrders.orderToOrderDTO(savedOrder);
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
            if (order.getStatus() == StatusEnum.ENVIADO || order.getStatus() == StatusEnum.CANCELADO){
                throw new ExceptionChangeOrderStatus("No se ha podido cancelar el pedido porque se ha enviado o cancelado");
            }

            for(OrderItem item : order.getItems()) {
                Products product = item.getProduct();
                product.setStock(product.getStock() + item.getQuantity());
                repositoryProducts.save(product);
            }

            order.setStatus(StatusEnum.CANCELADO);

            Orders cancelledOrder = this.repositoryOrders.save(order);
            return this.mapperOrders.orderToOrderDTO(cancelledOrder);
        }
        throw new ExceptionOrderNotFound("No se ha encontrado el pedido con la id " + id);
    }

    @Override
    public List<OrdersDTO> getOrderByIdBuyer(Long buyer) {
        return this.mapperOrders.ordersToOrdersDTO(this.repositoryOrders.findOrdersByBuyerId(buyer));
    }

}
