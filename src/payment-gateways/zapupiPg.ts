// import axios from "axios";
// import { trpcResponse } from "@global/trpc/trpc.js";
// import qs from "qs";
// // Base URL
// const zapupiPgBaseUrl =
//     "https://script.google.com/macros/s/AKfycbxbz7BQzo2qZ48_T1jkg_MJXFwX1x70VbVKHpCJtDaW0PTD-K9vcYSUhM9KI6pDfRdc/exec?url=https://api.zapupi.com/api";

// export interface CreateOrderProps {
//     apiKey: string;
//     secretKey: string;
//     amount: number;
//     orderId: string;
//     mobileNumber?: string;
//     redirectUrl?: string;
//     remark?: string;
// }

// export interface CreateOrderPayload {
//     token_key: string; // required
//     secret_key: string; // required
//     amount: number; // required
//     order_id: string; // required
//     custumer_mobile?: string; // optional
//     redirect_url?: string; // optional
//     remark?: string; // optional
// }

// export interface CreateOrderSuccessResponse {
//     status: "success";
//     message: string;
//     payment_url: string;
//     order_id: string;
//     payment_data?: string;
//     auto_check_every_2_sec?: string;
//     utr_check?: string;
// }

// export interface CreateOrderErrorResponse {
//     status: "error";
//     message: string;
// }

// export type CreateOrderResponse = CreateOrderSuccessResponse | CreateOrderErrorResponse;

// export const createOrder = async ({
//     amount,
//     orderId,
//     secretKey,
//     apiKey,
//     mobileNumber,
//     redirectUrl,
//     remark,
// }: CreateOrderProps) => {
//     try {
//         const payload: CreateOrderPayload = {
//             token_key: apiKey,
//             secret_key: secretKey,
//             order_id: orderId,
//             amount,

//             redirect_url: redirectUrl,
//             custumer_mobile: mobileNumber,
//             remark,
//         };

//         console.log({ payload });

//         const response = await axios.post<CreateOrderResponse>(
//             `${zapupiPgBaseUrl}/create-order`,
//             qs.stringify(payload),
//             {
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                 },
//             }
//         );

//         const data = response.data;

//         console.log({ data });

//         if (data.status === "error") {
//             return trpcResponse({
//                 status: "error",
//                 message: data.message || "Order creation failed",
//             });
//         }

//         return trpcResponse({
//             status: "success",
//             message: "Order created successfully",
//             result: data,
//         });
//     } catch (error) {
//         console.error("ZapUpi createOrder error:", error);

//         if (axios.isAxiosError(error)) {
//             return trpcResponse({
//                 status: "error",
//                 message: error.response?.data?.message || "ZapUpi API error",
//                 result: error.response?.data,
//             });
//         }

//         return trpcResponse({
//             status: "error",
//             message: "Unexpected error occurred while creating order",
//         });
//     }
// };

// export const zapupiPg = {
//     createOrder,
// };
