import { Request, Response } from 'express';
import { getSubscriber } from '../utils';

export type GetSubscriberPayload = {
  apiSecret: string;
  id: string;
};

export const getSubscriberHandler = async (req: Request, res: Response) => {
  try {
    const { apiSecret, id } = req.body.payload as GetSubscriberPayload;

    if (!apiSecret) {
      throw new Error('Missing apiSecret');
    }

    if (!id) {
      throw new Error('Missing id');
    }

    const subscriber = await getSubscriber({ apiSecret, id });

    return res.json(subscriber);
  } catch (error: any) {
    return res.status(500).send(error.message || 'Failed to get subscriber.');
  }
};
