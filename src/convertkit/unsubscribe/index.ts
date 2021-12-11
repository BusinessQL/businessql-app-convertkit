import { Request, Response } from 'express';
import { unsubscribe } from '../utils';

export type UnubscribePayload = {
  apiSecret: string;
  email: string;
};

export const unsubscribeHandler = async (req: Request, res: Response) => {
  try {
    const { apiSecret, email } = req.body.payload as UnubscribePayload;

    if (!apiSecret) {
      throw new Error('Missing apiSecret');
    }

    if (!email) {
      throw new Error('Missing email');
    }

    const subscriber = await unsubscribe({ apiSecret, email });

    return res.json(subscriber);
  } catch (error: any) {
    return res.status(500).send(error.message || 'Failed to unsubscribe.');
  }
};
