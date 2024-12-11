package com.example.demo;

public interface PaymentService {
    boolean processPayment(String userId, String productId, int quantity);
}
