'use server';

import Question from '@/database/question.model';
import { connectDB } from '../mongooseConnect';
import Tag from '@/database/tag.model';

export async function createQuestion(params: any) {
  try {
    // Make connect to DB server
    connectDB();

    const { title, content, author, tags } = params;

    // Create a question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // Create tags or get that tag from database if they exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, 'i') }, // It will find the tagName as the tag
        },
        {
          $setOnInsert: { name: tag },
          $push: { question: question._id },
        },
        {
          upsert: true,
          new: true,
        }
      );

      tagDocuments.push(existingTag.id);
    }

    // Add all the tags related to its question
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
  } catch (error) {
    console.log('Error in question action: ' + error);
    throw error;
  }
}
