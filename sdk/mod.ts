import {
  Subscriber,
  GetSubscriberOptions,
  SubscribeOptions,
  UpdateSubscriberOptions,
  UnsubscribeOptions,
} from './types.ts';
import { config } from '../config.ts';
import {
  BusinessQL,
  gql,
} from 'https://storage.nubo.codes/@businessql/businessql/0.0.2/mod.ts';

const apiKeyName = 'CONVERTKIT_API_KEY';

export class ConvertKit {
  public static config = config;

  public static getSubscriber = async ({
    id,
    apiKey,
  }: GetSubscriberOptions): Promise<Subscriber> => {
    const result = await BusinessQL.graphql<{
      data: { getSubscriber: Subscriber };
    }>({
      query: gql`
        query GetSubscriber($id: ID!) {
          getSubscriber(id: $id) {
            id
            email
            name
          }
        }
      `,
      variables: {
        id,
      },
      apiKeyName,
      apiKey,
    });

    return result.data.getSubscriber;
  };

  public static subscribe = async ({
    groupId,
    email,
    name,
    apiKey,
  }: SubscribeOptions): Promise<Subscriber> => {
    const result = await BusinessQL.graphql<{
      data: { subscribe: Subscriber };
    }>({
      query: gql`
        mutation Subscribe($groupId: ID!, $email: String!, $name: String) {
          subscribe(groupId: $groupId, email: $email, name: $name) {
            id
            email
            name
          }
        }
      `,
      variables: {
        groupId,
        email,
        name,
      },
      apiKeyName,
      apiKey,
    });

    return result.data.subscribe;
  };

  public static updateSubscriber = async ({
    id,
    email,
    name,
    apiKey,
  }: UpdateSubscriberOptions): Promise<Subscriber> => {
    const result = await BusinessQL.graphql<{
      data: { updateSubscriber: Subscriber };
    }>({
      query: gql`
        mutation Subscribe($id: ID!, $email: String!, $name: String) {
          updateSubscriber(id: $id, email: $email, name: $name) {
            id
            email
            name
          }
        }
      `,
      variables: {
        id,
        email,
        name,
      },
      apiKeyName,
      apiKey,
    });

    return result.data.updateSubscriber;
  };

  public static unsubscribe = async ({
    email,
    apiKey,
  }: UnsubscribeOptions): Promise<Subscriber> => {
    const result = await BusinessQL.graphql<{
      data: { unsubscribe: Subscriber };
    }>({
      query: gql`
        mutation Unsubscribe($email: String!) {
          unsubscribe(email: $email) {
            id
            email
            name
          }
        }
      `,
      variables: {
        email,
      },
      apiKeyName,
      apiKey,
    });

    return result.data.unsubscribe;
  };
}
