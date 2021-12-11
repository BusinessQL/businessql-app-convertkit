import { Request, Response } from 'express';
import { updateSubscriber } from '../utils';

export type UpdateSubscriberPayload = {
  apiSecret: string;
  id: string;
  email: string;
  name?: string;
};

export const updateSubscriberHandler = async (req: Request, res: Response) => {
  try {
    const { apiSecret, id, email, name } = req.body
      .payload as UpdateSubscriberPayload;

    if (!apiSecret) {
      throw new Error('Missing apiSecret');
    }

    if (!id) {
      throw new Error('Missing id');
    }

    if (!email) {
      throw new Error('Missing email');
    }

    const subscriber = await updateSubscriber({
      apiSecret,
      id,
      email,
      name,
    });

    return res.json(subscriber);
  } catch (error: any) {
    return res
      .status(500)
      .send(error.message || 'Failed to update subscriber.');
  }
};
