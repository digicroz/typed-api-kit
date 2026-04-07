import axios from "axios";
import { stdResponse, type StdResponse } from "@digicroz/js-kit";
import z from "zod";

let osClientZodSchema = z.object({
  appId: z.string(),
  apiKey: z.string(),
});

type TCreateOneSignalClient = z.infer<typeof osClientZodSchema>;

export const createOneSignalClient = ({
  appId,
  apiKey,
}: TCreateOneSignalClient) => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: `Basic ${apiKey}`,
  } as const;

  let commonZodSchema = {
    message: z.string(),
    heading: z.string().optional(),
    onClickLink: z.string().optional(),
    thumbnailUrl: z.string().optional(),
  };
  const pushToAllUsersZod = z.object({
    ...commonZodSchema,
  });

  type TPushNotificationToAllUsers = z.infer<typeof pushToAllUsersZod>;
  const pushNotificationToAllUsers = async ({
    message,
    heading,
    onClickLink,
    thumbnailUrl,
  }: TPushNotificationToAllUsers) => {
    try {
      let payload: any = {
        app_id: appId,
        contents: { en: message },
        priority: 10,
        included_segments: ["All"],
      };

      if (heading) {
        payload.headings = { en: heading };
      }

      if (thumbnailUrl) {
        payload.big_picture = thumbnailUrl;
      }

      if (onClickLink) {
        payload.url = onClickLink;
      }

      const response = await axios.post(
        "https://onesignal.com/api/v1/notifications",
        payload,
        { headers },
      );
      // console.log("pushNotificationToAllUsers::", response);

      const data = response.data;

      if (data.errors && data.errors.length > 0) {
        let errMsg = data.errors?.[0] ?? "";

        switch (errMsg) {
          case "All included players are not subscribed":
            return stdResponse.error("all_included_players_are_not_subscribed");
        }
      }

      if (data.id) {
        return stdResponse.success({ id: data.id as string });
      }
      console.log("pushNotificationToAllUsers::", data);
      return stdResponse.error("onesignal_unknown_response");
    } catch (error: any) {
      const data = error.response.data;

      if (data.errors && data.errors.length > 0) {
        let errMsg = data.errors?.[0] ?? "";

        switch (errMsg) {
          case "Request is malformed: Failed to parse app_id from request":
            return stdResponse.error("onesignal_app_id_is_invalid");
          case "Failed to parse app_id from request (app_id is present but malformed)":
            return stdResponse.error("onesignal_app_id_is_invalid");
          case "Access denied.  Please include an 'Authorization: ...' header with a valid API key (https://documentation.onesignal.com/docs/en/keys-and-ids#api-keys).":
            return stdResponse.error("onesignal_api_key_is_invalid");
          case "Message Notifications must have Any/English language content":
            return stdResponse.error("onesignal_message_content_is_invalid");
        }
      }

      console.log("pushNotificationToAllUsersError::", data);
      return stdResponse.error("onesignal_unknown_error");
    }
  };

  let pushToSpecificUsersZod = z.object({
    ...commonZodSchema,
    externalUserIds: z.array(z.string()),
  });

  type TPushNotificationToSpecificUsers = z.infer<
    typeof pushToSpecificUsersZod
  >;

  const pushNotificationToSpecificUsers = async ({
    message,
    heading,
    onClickLink,
    thumbnailUrl,
    externalUserIds,
  }: TPushNotificationToSpecificUsers) => {
    try {
      let payload: any = {
        app_id: appId,
        contents: { en: message },
        priority: 10,
        channel_for_external_user_ids: "push",
        include_external_user_ids: externalUserIds,
      };

      if (heading) {
        payload.headings = { en: heading };
      }

      if (thumbnailUrl) {
        payload.big_picture = thumbnailUrl;
      }

      if (onClickLink) {
        payload.url = onClickLink;
      }

      const response = await axios.post(
        "https://onesignal.com/api/v1/notifications",
        payload,
        { headers },
      );
      const data = response.data;
      // console.log("pushNotificationToSpecificUsersResponse::", data);
      if (data.errors && data.errors.length > 0) {
        let errMsg = data.errors?.[0] ?? "";

        switch (errMsg) {
          case "All included players are not subscribed":
            return stdResponse.error("all_included_players_are_not_subscribed");
        }
      }

      if (data.id) {
        let invalidExternalUserIds: string[] = [];

        const warningMsg = data?.warnings?.invalid_external_user_ids;

        if (warningMsg) {
          const match = warningMsg.match(/\[(.*?)\]/);

          if (match) {
            try {
              invalidExternalUserIds = JSON.parse(match[0]);
            } catch (e) {
              console.warn("Failed to parse invalid_external_user_ids", e);
            }
          }
        }

        return stdResponse.success({
          id: data.id as string,
          invalidExternalUserIds,
        });
      }
      console.log("pushNotificationToSpecificUsersResponse::", data);
      return stdResponse.error("onesignal_unknown_response");
    } catch (error: any) {
      const data = error.response.data;
      // console.log("pushNotificationToSpecificUsersError::", data);
      if (data.errors && data.errors.length > 0) {
        let errMsg = data.errors?.[0] ?? "";

        switch (errMsg) {
          case "Request is malformed: Failed to parse app_id from request":
            return stdResponse.error("onesignal_app_id_is_invalid");
          case "Failed to parse app_id from request (app_id is present but malformed)":
            return stdResponse.error("onesignal_app_id_is_invalid");
          case "Access denied.  Please include an 'Authorization: ...' header with a valid API key (https://documentation.onesignal.com/docs/en/keys-and-ids#api-keys).":
            return stdResponse.error("onesignal_api_key_is_invalid");
          case "Message Notifications must have Any/English language content":
            return stdResponse.error("onesignal_message_content_is_invalid");
          case "You must include which players, segments, or tags you wish to send this notification to":
          case "include_external_user_ids must be an array of non empty strings":
            return stdResponse.error("onesignal_message_recipients_is_invalid");
        }
      }

      console.log("pushNotificationToSpecificUsersError::", data);
      return stdResponse.error("onesignal_unknown_error");
    }
  };

  return {
    pushNotificationToAllUsers,
    pushNotificationToSpecificUsers,
  } as const;
};

export default createOneSignalClient;
