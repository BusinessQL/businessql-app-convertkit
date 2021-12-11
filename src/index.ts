import { Request, Response } from 'express';
import { getSubscriberHandler } from './convertkit/get-subscriber';
import { subscribeHandler } from './convertkit/subscribe';
import { unsubscribeHandler } from './convertkit/unsubscribe';
import { updateSubscriberHandler } from './convertkit/update-subscriber';

export const main = async (req: Request, res: Response) => {
  try {
    const { action } = req.body;

    switch (action) {
      case 'subscribe':
        return subscribeHandler(req, res);

      case 'getSubscriber':
        return getSubscriberHandler(req, res);

      case 'updateSubscriber':
        return updateSubscriberHandler(req, res);

      case 'unsubscribe':
        return unsubscribeHandler(req, res);

      default:
        break;
    }
    throw new Error(`Invalid action: ${action}`);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed' });
  }
};
