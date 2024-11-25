import { useState } from "react";
import fetcher from "@/utils/fetcher";

export const useOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = (err) => {
    console.error(err);
    setError(err.response?.data?.message || "Something went wrong");
  };
  const createOrder = async (orderData) => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Create Order and Return Payment Link
      const response = await fetcher.post(
        "/restorex/orders/createOrder",
        orderData
      );

      if (response.data) {
        // If payment URL is provided, return the payment link (order placed)
        if (response.data.paymentURL) {
          window.location.href = response.data.paymentURL;
          console.log("Order created, payment link:", response.data.paymentURL);
          return {
            status: "placed",
            message: "Order created successfully. Complete payment to proceed.",
            paymentURL: response.data.paymentURL,
          };
        }

        // Step 2: Handle Payment Success
        if (response.data.payment === "success") {
          console.log("Payment successful for order:", response.data.orderId);
          return {
            status: "paymentSuccess",
            message: `Your payment for order ${response.data.orderId} was successful. Your order will be processed shortly.`,
          };
        }

        // Step 3: Handle Delivered Success
        if (response.data.delivered === "success") {
          console.log("Order successfully delivered:", response.data.orderId);
          return {
            status: "deliveredSuccess",
            message: `Your order ${response.data.orderId} has been successfully delivered.`,
          };
        }

        // Default case if none of the expected conditions are met
        throw new Error("Unexpected response from server.");
      }

      throw new Error("No data received from the server.");
    } catch (err) {
      handleError(err);
      return { status: "error", message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const getAllOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher.get("/restorex/orders/getAllOrders");
      console.log(response.data.orders);
      setOrders(response.data.orders);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher.get(`/restorex/orders/getOrderById/${id}`);
      console.log(response.data.order);
      return response.data.order;
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher.put(`/restorex/orders/cancelOrder/${id}`);
      console.log(response.data);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
      return response.data;
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const getOrdersForSeller = async (sellerId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher.get(`/restorex/orders/getOrdersForSeller`);
      console.log(response.data.orders);
      return response.data.orders;
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const getCustomersBySeller = async (sellerId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher.get(
        `/restorex/orders/getCustomersBySeller`
      );
      console.log(response.data?.customers);
      return response.data.customers;
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // const getAccessToken = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetcher.post("/restorex/orders/getAccessToken");
  //     console.log(response.data);
  //     return response.data;
  //   } catch (err) {
  //     handleError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const processPayment = async (paymentData) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetcher.post("/restorex/orders/processPayment", paymentData);
  //     console.log(response.data);
  //     return response.data;
  //   } catch (err) {
  //     handleError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const paymentWebhook = async (webhookData) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetcher.post("/restorex/orders/paymentWebhook", webhookData);
  //     console.log(response.data);
  //     return response.data;
  //   } catch (err) {
  //     handleError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const paymentCallback = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetcher.get("/restorex/orders/paymentCallback");
  //     console.log(response.data);
  //     return response.data;
  //   } catch (err) {
  //     handleError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const validatePayment = async (token) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetcher.get(`/restorex/orders/validatePayment/${token}`);
  //     console.log(response.data);
  //     return response.data;
  //   } catch (err) {
  //     handleError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return {
    orders,
    loading,
    error,
    createOrder,
    getAllOrders,
    getOrderById,
    cancelOrder,
    getOrdersForSeller,
    getCustomersBySeller,
    // getAccessToken,
    // processPayment,
    // paymentWebhook,
    // paymentCallback,
    // validatePayment,
  };
};
