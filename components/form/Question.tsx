'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import Image from 'next/image';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchema } from '@/lib/formValidation';
import { createQuestion } from '@/lib/actions/question.action';
import { useRouter, usePathname } from 'next/navigation';

const type: any = 'create';

interface Props {
  mongoUserId: string;
}

const Question = ({ mongoUserId }: Props) => {
  const editorRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      explanation: '',
      tags: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      // make an async call to your API -> create a question
      // contain all form data
      await createQuestion({
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        author: JSON.parse(mongoUserId),
      });
      //   Navigate to home page
      router.push('/');
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === 'Enter' && field.name === 'tags') {
      console.log('field: ', field.value);
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== '') {
        if (tagValue.length > 15) {
          return form.setError('tags', {
            type: 'required',
            message: 'Tag must be less than 15 characters',
          });
        }

        console.log(!field.value.includes(tagValue as never));

        if (!field.value.includes(tagValue as never)) {
          form.setValue('tags', [...field.value, tagValue]);
          tagInput.value = '';
          form.clearErrors('tags');
        } else {
          form.setError('tags', {
            type: 'required',
            message: 'Tag must different',
          });
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue('tags', newTags);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col gap-10'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col space-y-2'>
              <FormLabel className='paragraph-semibold text-dark400_light800 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Question Title
                <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your input/question here..'
                  {...field}
                  className='no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 mt-3.5 flex h-9 min-h-[56px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300'
                />
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-[0.8rem] text-light-500 dark:text-slate-400'>
                Be specific and imagine you’re asking a question to another
                person and most important اللہ is watching everyone..
              </FormDescription>
              <FormMessage className='text-[0.8rem] font-medium text-red-500 dark:text-red-900' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='explanation'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col space-y-2'>
              <FormLabel className='paragraph-semibold text-dark400_light800 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Detailed explanation of your Topic related to &apos;Islam&apos;
                community.
                <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                  // @ts-ignore
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue=''
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table',
                    ],
                    toolbar:
                      'undo redo | ' +
                      'bold italic backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent ',
                    content_style:
                      'body { font-family:Inter,Poppins,sans-serif; font-size:16px }',
                  }}
                />
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-[0.8rem] text-light-500 dark:text-slate-400'>
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage className='text-[0.8rem] font-medium text-red-500 dark:text-red-900' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col space-y-2'>
              <FormLabel className='paragraph-semibold text-dark400_light800 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Tags
                <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    placeholder='Add related tags'
                    onKeyDown={(e) => handleKeyDown(e, field)}
                    className='no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 mt-3.5 flex h-9 min-h-[56px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300'
                  />

                  {field.value.length > 0 && (
                    <div className='flex-start mt-2.5 gap-2.5'>
                      {field.value.map((tag: any) => {
                        return (
                          <Badge
                            key={tag}
                            className='subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border border-none border-transparent bg-slate-900 px-4 py-2 text-xs capitalize'
                          >
                            {tag}
                            <Image
                              src='/assets/icons/close.svg'
                              alt='Close tags'
                              width={12}
                              height={12}
                              onClick={() => handleTagRemove(tag, field)}
                              className='cursor-pointer'
                            />
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-[0.8rem] text-light-500 dark:text-slate-400'>
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage className='text-[0.8rem] font-medium text-red-500 dark:text-red-900' />
            </FormItem>
          )}
        />

        <div className='mt-16 flex justify-end'>
          <Button
            type='submit'
            className='primary-gradient inline-flex h-9 min-h-[46px] items-center justify-center rounded-md bg-slate-900 px-4 py-3 text-sm font-medium  shadow transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus-visible:ring-slate-300'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>{type === 'edit' ? 'Editing...' : 'Posting...'}</>
            ) : (
              <>{type === 'edit' ? 'Editing...' : 'Ask a question'}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Question;
