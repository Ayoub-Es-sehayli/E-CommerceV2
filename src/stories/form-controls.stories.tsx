import "bootstrap-icons/font/bootstrap-icons.css";
import { useForm } from "react-hook-form";
import "tailwindcss/tailwind.css";
import { Input, Select } from "../components/form-controls";
import Checkbox from "../components/form-controls/checkbox";
import { RadioGroup } from "../components/form-controls/radio";

export const TextInput = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ name: string }>();
  const onSubmit = (data: { name: string }) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Hello"
        placeholder="Input name here"
        errors={errors}
        {...register("name")}
      />
      <button type="submit">submit</button>
    </form>
  );
};

export const SelectInput = () => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<{ name: string }>();
  const onSubmit = (data: { name: string }) => console.log(data);
  const options = [
    { label: "Hello", value: 0 },
    { label: "lorem", value: 1 },
    { label: "ipsum", value: 2 },
  ];
  const FormSelect = Select<{ name: string }>();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSelect
        label="Hello"
        placeholder="Select name here"
        errors={errors}
        options={options}
        control={control}
        name="name"
      />

      <button type="submit">submit</button>
    </form>
  );
};

export const CheckboxInput = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<{ gender: string }>();
  const onSubmit = (data: { gender: string }) => console.log(data);
  const FormCheckbox = Checkbox<{ gender: string }>();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormCheckbox
        control={control}
        errors={errors}
        label="Check here"
        name="gender"
      />
      <button type="submit">submit</button>
    </form>
  );
};

export const RadioInputs = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<{ shipping: string }>();
  const onSubmit = (data: { shipping: string }) => console.log(data);
  const FormRadioGroup = RadioGroup<{ shipping: string }>();
  const options = [
    { label: "hello", value: "1" },
    { label: "hello2", value: "2" },
    { label: "hello3", value: "3" },
  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRadioGroup control={control} name="shipping" options={options} />
      <button type="submit">submit</button>
    </form>
  );
};
