package com.example.demo;

public class OrderService {
    private final PaymentService paymentService;
    private final InventoryService inventoryService;
    private final NotificationService notificationService;

    public OrderService(PaymentService paymentService, InventoryService inventoryService, NotificationService notificationService) {
        this.paymentService = paymentService;
        this.inventoryService = inventoryService;
        this.notificationService = notificationService;
    }

    public String placeOrder(String productId, int quantity, String userId) {
        if (!inventoryService.isProductAvailable(productId, quantity)) {
            return "Product not available";
        }

        try {
            boolean paymentSuccess = paymentService.processPayment(userId, productId, quantity);
            if (!paymentSuccess) {
                return "Payment failed";
            }
        } catch (Exception e) {
            return "Payment exception: " + e.getMessage();
        }

        notificationService.sendNotification(userId, "Order placed successfully!");
        return "Order successful";
    }
}
