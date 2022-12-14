import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BsCardImage } from 'react-icons/bs';
import type { ImageListType } from 'react-images-uploading';
import ImageUploading from 'react-images-uploading';

import { errorNotify, successNotify } from '@/app/server/notify/setNotify';
import ApiClientLocal from '@/app/utils/ApiClientLocal';

import ErrorNotify from '../notify/ErrorNotify';
import SuccessNotify from '../notify/SuccessNotify';
import DynamicButton from '../toggleBtn/DynamicButton';
import TextFeild from './TextField';

const UserRegistrtion = () => {
  const [images, setImages] = useState<ImageListType | any>([]);
  const maxNumber = 69;

  const onChange = (imageList: any, addUpdateIndex: any) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const router = useRouter();
  const initialValuesSignUp = {
    name: '',
    email: '',
    phone: '',
    password: '',
    job: '',
  };

  const handleRegsiterSubmit = async (value: any) => {
    return ApiClientLocal.post('/api/register', {
      name: value.name,
      email: value.email,
      phone: value.phone,
      password: value.password,
      job: value.job,
      image: images[0]?.data_url,
    })
      .then((data) => {
        if (data.data.message === 'Welcome ,you are successfully signed up') {
          router.push('/login');
          successNotify(data.data.message);
        }
        if (data.data.status === 500) {
          errorNotify('Server Time out , please press on sign up again');
        }
        console.log(data, 'local');

        return data.data;
      })
      .catch((err) => {
        console.log(err.response, 'err local');
        if (err.response.status === 422) {
          errorNotify(err.response.data);
        }
        if (err.response.status === 400) {
          errorNotify(err.response.data);
        }

        return err;
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Formik
        // validationSchema={SignUpFormSchema}
        initialValues={initialValuesSignUp}
        onSubmit={handleRegsiterSubmit}
      >
        {({ errors, touched, isSubmitting, isValid }) => {
          return (
            <Form>
              <section className=" h-[41rem]" data-testid="form-signup">
                <SuccessNotify />
                <ErrorNotify />
                <div className=" w-full  lg:pt-[5px] xl:pt-[20px]">
                  <h2 className="text-center text-3xl font-semibold text-red-600 ">
                    Create Account
                  </h2>
                </div>
                <div className="flex w-full items-center justify-center gap-5 py-2">
                  <ImageUploading
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      // onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      <div>
                        <div
                          onClick={onImageUpload}
                          className="flex  h-[8rem] w-[8rem] cursor-pointer items-center justify-center rounded-full border-2 border-red-500 bg-white p-1 shadow-xl"
                          {...dragProps}
                        >
                          {images.length === 0 ? (
                            <BsCardImage
                              size={30}
                              className={
                                isDragging ? 'text-green-600' : undefined
                              }
                            />
                          ) : null}
                          {imageList.map((image, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-start gap-10"
                            >
                              <img
                                src={image.data_url}
                                alt=""
                                className="w-fit rounded-full"
                              />
                              <div>
                                <button onClick={() => onImageUpdate(index)}>
                                  Update
                                </button>
                                <button onClick={() => onImageRemove(index)}>
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </ImageUploading>
                </div>
                <div className=" mt-[5px] flex w-full flex-col  ">
                  <div className=" mx-auto">
                    <TextFeild
                      width={'w-[25rem]'}
                      label="Name"
                      name="name"
                      placeholder="your name"
                      type="name"
                      showError={!!(touched.name && errors.name)}
                    />

                    <TextFeild
                      width={'w-[25rem]'}
                      label="Phone"
                      name="phone"
                      placeholder="your Phone"
                      type="text"
                      showError={!!(touched.phone && errors.phone)}
                    />

                    <TextFeild
                      width={'w-[25rem]'}
                      label="Email"
                      name="email"
                      placeholder="email"
                      type="email"
                      showError={!!(touched.email && errors.email)}
                    />

                    <TextFeild
                      width={'w-[25rem]'}
                      label="Password"
                      name="password"
                      placeholder="password"
                      type="password"
                      showError={!!(touched.password && errors.password)}
                    />

                    <TextFeild
                      width={'w-[25rem]'}
                      label="job"
                      name="job"
                      placeholder="job"
                      type="text"
                      showError={!!(touched.job && errors.job)}
                    />
                  </div>

                  <DynamicButton
                    label={'Sign up'}
                    type="submit"
                    // loader={!!isLoading}
                    width="w-[160px]"
                    isDisabled={!isValid || isSubmitting}
                  />
                </div>
              </section>
            </Form>
          );
        }}
      </Formik>
    </motion.div>
  );
};

export default UserRegistrtion;
