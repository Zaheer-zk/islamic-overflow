'use server';

import { connectDB } from '../mongooseConnect';

export async function createQuestion(params: any) {
  try {
    /* empty */
    // Make connect to DB server
    connectDB();
  } catch (error) {}
}
