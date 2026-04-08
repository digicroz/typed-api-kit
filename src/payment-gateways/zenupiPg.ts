// import { trpcResponse } from "@global/trpc/trpc.js";
// import axios from "axios";

// const zenupiPgBaseUrl = "https://upi.zenupi.online/api";

// const createOrder = async ({ gatewayApiKey, mobileNumber, amount, orderId, redirectUrl }) => {
//     try {
//         const payload: {
//             customer_mobile: string;
//             user_token: string;
//             amount: string;
//             order_id: string;
//             redirect_url: string;
//             remark1: string;
//             remark2: string;
//         } = {
//             customer_mobile: mobileNumber,
//             user_token: gatewayApiKey,
//             amount: amount,
//             order_id: orderId,
//             redirect_url: redirectUrl,
//             remark1: "",
//             remark2: "",
//         };

//         const response = await axios.post(`${zenupiPgBaseUrl}/create-order`, payload, {
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//             },
//         });

//         // console.log(response.data);
//         if (!response.data || response.data.status === "false") {
//             return trpcResponse({
//                 status: "error",
//                 message: response.data.message || "Unknown error",
//             });
//         }

//         return trpcResponse({
//             status: "success",
//             message: "paymentGatewayData fetched",
//             result: response.data,
//         });
//     } catch (error) {
//         console.log("Error : " + error);

//         if (axios.isAxiosError(error)) {
//             return trpcResponse({
//                 status: "error",
//                 message: "paymentGatewayData fetched",
//                 result: error.response?.data,
//             });
//         } else {
//             return trpcResponse({
//                 status: "error",
//                 message: "Unexpected error occurred",
//             });
//         }
//     }
// };

// export const zenupiPg = {
//     createOrder,
// };
