import axios from "axios"
import { stdResponse } from "@digicroz/js-kit"

// Base URL
const zapUpiPgBaseUrl = "https://pay.zapupi.com/api"

export interface CreateOrderProps {
  zapKey: string
  orderId: string
  amount: number
  customerMobile?: string
  remark?: string
  cashierId?: string
  successUrl?: string
  failedUrl?: string
  timeoutUrl?: string
}

export interface CreateOrderPayload {
  zap_key: string // required
  order_id: string // required
  amount: number // required
  customer_mobile?: string // optional
  remark?: string // optional
  cashier_id?: string // optional
  success_url?: string // optional
  failed_url?: string // optional
  timeout_url?: string // optional
}

export interface CreateOrderSuccessResponse {
  status: "success"
  message: string
  order_id: string
  environment: string
  payment_url: string
}

export interface CreateOrderErrorResponse {
  status: "error"
  message: string
}

export type CreateOrderResponse =
  | CreateOrderSuccessResponse
  | CreateOrderErrorResponse

export const createOrder = async ({
  zapKey,
  orderId,
  amount,
  customerMobile,
  remark,
  cashierId,
  successUrl,
  failedUrl,
  timeoutUrl,
}: CreateOrderProps) => {
  try {
    const payload: CreateOrderPayload = {
      zap_key: zapKey,
      order_id: orderId,
      amount,
      customer_mobile: customerMobile,
      remark,
      cashier_id: cashierId,
      success_url: successUrl,
      failed_url: failedUrl,
      timeout_url: timeoutUrl,
    }

    console.log({ payload })

    const response = await axios.post<CreateOrderResponse>(
      `${zapUpiPgBaseUrl}/create-order`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    console.log(" zapUpiPg response Data: " + JSON.stringify(response.data))
    if (!response.data || response.data.status === "error") {
      console.log("zapUpiPg-error : " + response.data.message)

      return stdResponse.error("zapUpiPg-error")
    }

    return stdResponse.success(response.data)
  } catch (error) {
    console.log("Error : " + error)

    if (axios.isAxiosError(error)) {
      return stdResponse.error("zapUpiPg-server-error")
    } else {
      return stdResponse.error("zapUpiPg-unknown-error")
    }
  }
}

export interface OrderStatusProps {
  zapKey: string
  orderId: string
}

export interface OrderStatusPayload {
  zap_key: string // required
  order_id: string // required
}

export interface OrderStatusData {
  order_id: string
  status: string // Pending | Success | Failed
  amount: number
  pay_amount: number
  create_at: string
  txn_id: string
  remark: string
  remark_array: string[]
  utr: string
  customer_mobile: string
  environment: string
}

export interface OrderStatusSuccessResponse {
  status: "success"
  message: string
  data: OrderStatusData
}

export interface OrderStatusErrorResponse {
  status: "error"
  message: string
}

export type OrderStatusResponse =
  | OrderStatusSuccessResponse
  | OrderStatusErrorResponse

export const orderStatus = async ({ zapKey, orderId }: OrderStatusProps) => {
  try {
    const payload: OrderStatusPayload = {
      zap_key: zapKey,
      order_id: orderId,
    }

    console.log({ payload })

    const response = await axios.post<OrderStatusResponse>(
      `${zapUpiPgBaseUrl}/order-status`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    console.log(" zapUpiPg response Data: " + JSON.stringify(response.data))
    if (!response.data || response.data.status === "error") {
      console.log("zapUpiPg-error : " + response.data.message)

      return stdResponse.error("zapUpiPg-error")
    }

    return stdResponse.success(response.data)
  } catch (error) {
    console.log("Error : " + error)

    if (axios.isAxiosError(error)) {
      return stdResponse.error("zapUpiPg-server-error")
    } else {
      return stdResponse.error("zapUpiPg-unknown-error")
    }
  }
}

export const zapUpiPg = {
  createOrder,
  orderStatus,
}
