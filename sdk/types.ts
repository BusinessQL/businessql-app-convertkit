export type Subscriber = {
  id: string;
  email: string;
  name?: string;
};
export type GetSubscriberOptions = {
  id: string;
  apiKey?: string;
};

export type SubscribeOptions = {
  groupId: string;
  email: string;
  name?: string;
  apiKey?: string;
};

export type UpdateSubscriberOptions = {
  id: string;
  email: string;
  name?: string;
  apiKey?: string;
};

export type UnsubscribeOptions = {
  email: string;
  apiKey?: string;
};
