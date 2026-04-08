// import { trpcResponse } from "@global/trpc/trpc.js";
// import axios from "axios";

// const tranzupiPgBaseUrl = "https://tranzupi.com/api";

// type CreateOrderInput = {
//   gatewayApiKey: string;
//   mobileNumber: string;
//   amount: string;
//   orderId: string;
//   redirectUrl: string;
// };
// const createOrder = async ({
//   gatewayApiKey,
//   mobileNumber,
//   amount,
//   orderId,
//   redirectUrl,
// }: CreateOrderInput) => {
//   try {
//     const payload: {
//       customer_mobile: string;
//       user_token: string;
//       amount: string;
//       order_id: string;
//       redirect_url: string;
//       remark1: string;
//       remark2: string;
//     } = {
//       customer_mobile: mobileNumber,
//       user_token: gatewayApiKey,
//       amount: amount,
//       order_id: orderId,
//       redirect_url: redirectUrl,
//       remark1: "",
//       remark2: "",
//     };

//     const response = await axios.post(
//       `${tranzupiPgBaseUrl}/create-order`,
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       },
//     );

//     // console.log(response.data);
//     if (!response.data || response.data.status === "false") {
//       return trpcResponse({
//         status: "error",
//         message: response.data.message || "Unknown error",
//       });
//     }

//     return trpcResponse({
//       status: "success",
//       message: "paymentGatewayData fetched",
//       result: response.data,
//     });
//   } catch (error) {
//     console.log("Error : " + error);

//     if (axios.isAxiosError(error)) {
//       return trpcResponse({
//         status: "error",
//         message: "paymentGatewayData fetched",
//         result: error.response?.data,
//       });
//     } else {
//       return trpcResponse({
//         status: "error",
//         message: "Unexpected error occurred",
//       });
//     }
//   }
// };

// export const tranzupiPg = {
//   createOrder,
// };
