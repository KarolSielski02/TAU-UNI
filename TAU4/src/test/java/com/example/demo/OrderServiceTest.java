package com.example.demo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    PaymentService paymentService;
    @Mock
    InventoryService inventoryService;
    @Mock
    NotificationService notificationService;

    private OrderService orderService;

    @BeforeEach
    void setUp() {
        orderService = new OrderService(paymentService, inventoryService, notificationService);
    }

    @Test
    void testPlaceOrder_Success() {
        String productId = "prod123";
        int quantity = 1;
        String userId = "user123";

        when(inventoryService.isProductAvailable(productId, quantity)).thenReturn(true);
        when(paymentService.processPayment(userId, productId, quantity)).thenReturn(true);

        String result = orderService.placeOrder(productId, quantity, userId);

        assertEquals("Order successful", result);
        verify(notificationService).sendNotification(userId, "Order placed successfully!");
    }

    @Test
    void testPlaceOrder_ProductNotAvailable() {
        String productId = "prod123";
        int quantity = 1;
        String userId = "user123";

        when(inventoryService.isProductAvailable(productId, quantity)).thenReturn(false);

        String result = orderService.placeOrder(productId, quantity, userId);

        assertEquals("Product not available", result);
        verifyNoInteractions(paymentService);
        verifyNoInteractions(notificationService);
    }

    @Test
    void testPlaceOrder_PaymentFailed() {
        String productId = "prod123";
        int quantity = 1;
        String userId = "user123";

        when(inventoryService.isProductAvailable(productId, quantity)).thenReturn(true);
        when(paymentService.processPayment(userId, productId, quantity)).thenReturn(false);

        String result = orderService.placeOrder(productId, quantity, userId);

        assertEquals("Payment failed", result);
        verifyNoInteractions(notificationService);
    }

    @Test
    void testPlaceOrder_PaymentException() {
        String productId = "prod123";
        int quantity = 1;
        String userId = "user123";

        when(inventoryService.isProductAvailable(productId, quantity)).thenReturn(true);
        when(paymentService.processPayment(userId, productId, quantity)).thenThrow(new RuntimeException("Payment system error"));

        String result = orderService.placeOrder(productId, quantity, userId);

        assertEquals("Payment exception: Payment system error", result);
        verifyNoInteractions(notificationService);
    }
}
