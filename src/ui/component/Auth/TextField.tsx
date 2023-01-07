import { ErrorMessage, Field } from 'formik';
import React, { useState } from 'react';
import { HiEyeOff } from 'react-icons/hi';
import { HiEye } from 'react-icons/hi2';
import { IoWarningOutline } from 'react-icons/io5';

interface IFieldInputType {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  showError?: boolean;
  icon?: React.ReactNode;
  width: string;
}
const TextFeild = ({
  label,
  type,
  name,
  placeholder,
  showError,
  icon,
  width,
}: IFieldInputType) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const errMessage = useSelector(
  //   (state: RootState) => state.error.errorMessage
  // );
  return (
    <div
      className="relative  mb-[5px] min-w-[250px] max-w-full"
      data-testid="field-label"
    >
      <label
        htmlFor={name}
        className="mb-[7px] flex justify-between gap-3 text-[18px] font-medium text-[#524c4c] dark:text-white lg:text-[15px] xl:text-[18px]"
        data-testid="field-label"
      >
        {label}
        {showError && (
          <div className="flex w-fit items-center gap-1 rounded-lg text-[12px] capitalize text-red-500">
            <IoWarningOutline className="text-red-600" size={15} />
            <ErrorMessage name={name} />
          </div>
        )}
      </label>

      {icon}

      <Field
        type={!showPassword ? type : 'text'}
        // as={type}
        name={name}
        className={`${
          showError
            ? 'border-red-500 focus:outline-red-500'
            : 'border-[#E2E2E2] focus:outline-blue-600'
        } h-[45px] ${width} min-w-[250px] rounded-lg border-2 border-[#E2E2E2] bg-white  px-4 pl-10 text-[18px] text-[#524c4c] dark:bg-light-gray dark:text-white  `}
        placeholder={placeholder}
      />
      {type === 'password' ? (
        <div>
          {showPassword ? (
            <HiEye
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[45px] right-3 cursor-pointer text-[25px] text-[#9a9494]"
            />
          ) : (
            <HiEyeOff
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[45px] right-3 cursor-pointer text-[25px] text-[#9a9494] transition-all duration-200 ease-linear"
            />
          )}{' '}
        </div>
      ) : null}
    </div>
  );
};

export default TextFeild;
