import axios from 'axios';

export type Subscriber = {
  id: string;
  email: string;
  name?: string;
};

export type SubscribeResult = {
  subscription: {
    id: number;
    state: string;
    created_at: string;
    source: string;
    referrer: any;
    subscribable_id: number;
    subscribable_type: string;
    subscriber: {
      id: number;
      first_name?: string;
      email_address: string;
      state: string;
      created_at: string;
      fields: any;
    };
  };
};

export type GetSubscriberResult = {
  subscriber: {
    id: number;
    first_name?: string;
    email_address: string;
    state: string;
    created_at: string;
    fields: any;
  };
};

export type UpdateSubscriberResult = {
  subscriber: {
    id: number;
    first_name: string;
    email_address: string;
    state: string;
    created_at: string;
    fields: any;
  };
};

export type UnsubscribeResult = {
  subscriber: {
    id: number;
    first_name: string;
    email_address: string;
    state: string;
    created_at: string;
    fields: any;
  };
};

export const subscribe = async ({
  apiSecret,
  groupId,
  email,
  name,
}: {
  apiSecret: string;
  groupId: string;
  email: string;
  name?: string;
}): Promise<Subscriber> => {
  try {
    const result = await axios.post<SubscribeResult>(
      `https://api.convertkit.com/v3/tags/${groupId}/subscribe?api_secret=${apiSecret}`,
      { email, first_name: name }
    );

    return {
      id: String(result.data.subscription.subscriber.id),
      email: result.data.subscription.subscriber.email_address,
      name: result.data.subscription.subscriber.first_name,
    };
  } catch (error: any) {
    console.error(error);
    throw error.response?.data?.message
      ? new Error(error.response?.data?.message)
      : error;
  }
};

export const getSubscriber = async ({
  apiSecret,
  id,
}: {
  apiSecret: string;
  id: string;
}): Promise<Subscriber> => {
  try {
    const result = await axios.get<GetSubscriberResult>(
      `https://api.convertkit.com/v3/subscribers/${id}?api_secret=${apiSecret}`
    );

    return {
      id: String(result.data.subscriber.id),
      email: String(result.data.subscriber.email_address),
      name: String(result.data.subscriber.first_name),
    };
  } catch (error: any) {
    console.error(error);
    throw error.response?.data?.message
      ? new Error(error.response?.data?.message)
      : error;
  }
};

export const updateSubscriber = async ({
  apiSecret,
  id,
  email,
  name,
}: {
  apiSecret: string;
  id: string;
  email: string;
  name?: string;
}): Promise<Subscriber> => {
  try {
    const result = await axios.put<UpdateSubscriberResult>(
      `https://api.convertkit.com/v3/subscribers/${id}?api_secret=${apiSecret}`,
      { email_address: email, first_name: name }
    );

    return {
      id: String(result.data.subscriber.id),
      email: String(result.data.subscriber.email_address),
      name: String(result.data.subscriber.first_name),
    };
  } catch (error: any) {
    console.error(error);
    throw error.response?.data?.message
      ? new Error(error.response?.data?.message)
      : error;
  }
};

export const unsubscribe = async ({
  apiSecret,
  email,
}: {
  apiSecret: string;
  email: string;
}): Promise<Subscriber> => {
  try {
    const result = await axios.put<UnsubscribeResult>(
      `https://api.convertkit.com/v3/unsubscribe?api_secret=${apiSecret}`,
      { email }
    );

    return {
      id: String(result.data.subscriber.id),
      email: String(result.data.subscriber.email_address),
      name: String(result.data.subscriber.first_name),
    };
  } catch (error: any) {
    console.error(error);
    throw error.response?.data?.message
      ? new Error(error.response?.data?.message)
      : error;
  }
};
