import React from 'react';
import { useForm } from 'react-hook-form';

const FormComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("accountName", { required: true })} placeholder="Account Name" />
      {errors.accountName && <span>Account Name is required</span>}

      <input {...register("email", { required: true })} placeholder="Email" />
      {errors.email && <span>Email is required</span>}

      <input {...register("phone", { required: true })} placeholder="Phone" />
      {errors.phone && <span>Phone is required</span>}

      <input {...register("website")} placeholder="Website" />

      <input {...register("industry")} placeholder="Industry" />

      <select {...register("status", { required: true })}>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      {errors.status && <span>Status is required</span>}

      <textarea {...register("remark")} placeholder="Remark"></textarea>

      <input type="submit" />
    </form>
  );
};

export default FormComponent;
