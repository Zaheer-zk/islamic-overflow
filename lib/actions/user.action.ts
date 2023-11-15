'use server';

import User from '@/database/user.model';
import { connectDB } from '../mongooseConnect';

export const getUserById = async (params: any) => {
  try {
    connectDB();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.error('Error in user action', error);
    throw error;
  }
};
