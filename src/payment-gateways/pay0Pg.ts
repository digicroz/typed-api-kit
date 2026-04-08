import { stdResponse } from "@digicroz/js-kit";
import axios from "axios";

const pay0PgBaseUrl = "https://pay0.shop/api";

type TApiResponse = {
  status: boolean;
  message: string;
  result?: {
    order_id: string;
    payment_url: string;
  };
};

type CreateOrderInput = {
  gatewayApiKey: string;
  mobileNumber: string;
  amount: string;
  orderId: string;
  redirectUrl: string;
};

const createOrder = async ({
  gatewayApiKey,
  mobileNumber,
  amount,
  orderId,
  redirectUrl,
}: CreateOrderInput) => {
  try {
    const payload: {
      customer_mobile: string;
      user_token: string;
      amount: string;
      order_id: string;
      redirect_url: string;
      remark1: string;
      remark2: string;
    } = {
      customer_mobile: mobileNumber,
      user_token: gatewayApiKey,
      amount: amount,
      order_id: orderId,
      redirect_url: redirectUrl,
      remark1: "",
      remark2: "",
    };

    const response = await axios.post<TApiResponse>(
      `${pay0PgBaseUrl}/create-order`,
      payload,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    console.log(" pay0pg response Data: " + JSON.stringify(response.data));
    if (!response.data || response.data.status === false) {
      console.log("pay0pg-error : " + response.data.message);

      return stdResponse.error("pay0pg-error");
    }

    // return trpcResponse({
    //     status: "success",
    //     message: "paymentGatewayData fetched",
    //     result: response.data,
    // });

    return stdResponse.success(response.data.result);
  } catch (error) {
    console.log("Error : " + error);

    if (axios.isAxiosError(error)) {
      return stdResponse.error("pay0pg-server-error");
      // return trpcResponse({
      //     status: "error",
      //     message: "paymentGatewayData fetched",
      //     result: error.response?.data,
      // });
    } else {
      return stdResponse.error("pay0pg-unknown-error");
      // return trpcResponse({
      //     status: "error",
      //     message: "Unexpected error occurred",
      // });
    }
  }
};

export const pay0Pg = {
  createOrder,
};
