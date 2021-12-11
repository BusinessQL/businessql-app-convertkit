import { Request, Response } from 'express';
import { subscribe } from '../utils';

export type SubscribePayload = {
  apiSecret: string;
  groupId: string;
  email: string;
  name?: string;
};

export const subscribeHandler = async (req: Request, res: Response) => {
  try {
    const { apiSecret, groupId, email, name } = req.body
      .payload as SubscribePayload;

    if (!apiSecret) {
      throw new Error('Missing apiSecret');
    }

    if (!email) {
      throw new Error('Missing email');
    }

    if (!groupId) {
      throw new Error('Missing groupId');
    }

    const subscriber = await subscribe({ apiSecret, groupId, email, name });

    return res.json(subscriber);
  } catch (error: any) {
    return res.status(500).send(error.message || 'Failed to subscribe.');
  }
};
