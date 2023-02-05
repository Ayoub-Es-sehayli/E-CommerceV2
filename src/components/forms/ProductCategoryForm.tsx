import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useController, useForm } from "react-hook-form";
import {
  ProductCategoryDto,
  ProductCategorySchema,
} from "../../types/validators";
import { Button } from "../buttons";
import { Input, Select } from "../form-controls";
import Checkbox from "../form-controls/checkbox";
import { Spinner } from "../notification";
import { Show } from "../overlays";

const ProductCategoryForm: React.FC<{
  onSubmit: (category: ProductCategoryDto) => void;
  options: { value: number; label: string }[];
  initialValues?: Partial<ProductCategoryDto>;
}> = ({ onSubmit, options, initialValues }) => {
  const [isSubmitting, setSubmitting] = React.useState(false);
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm<ProductCategoryDto>({
    resolver: zodResolver(ProductCategorySchema),
    defaultValues: {
      ...initialValues,
      hasParent: initialValues?.parentId !== undefined,
    },
  });
  React.useEffect(() => {
    reset({
      ...initialValues,
      hasParent: initialValues?.parentId !== undefined,
    });
  }, [reset, initialValues]);
  const {
    field: { value: hasParentChecked },
  } = useController({ control: control, name: "hasParent" });
  const FormCheckbox = Checkbox<ProductCategoryDto>();
  const handleOnSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    console.log("Got Ok");

    onSubmit(data);
    setSubmitting(false);
    reset();
  });
  return (
    <form onSubmit={handleOnSubmit} className="flex flex-col gap-3">
      <Input
        label="Name"
        placeholder="Input name here"
        errors={errors}
        {...register("name")}
      />
      <FormCheckbox
        name="hasParent"
        label="Is Sub-category?"
        errors={errors}
        control={control}
      />
      {hasParentChecked === true ? (
        <Select
          name="parentId"
          errors={errors}
          label="Parent Category"
          options={options}
          control={control}
        />
      ) : null}
      <span className="flex justify-center gap-2">
        <Button
          disabled={isSubmitting}
          type="submit"
          className="bg-emerald-700 px-4 py-1 text-white hover:bg-emerald-600"
        >
          <Show when={!isSubmitting} fallback={<Spinner isLoading />}>
            Save
          </Show>
        </Button>
      </span>
    </form>
  );
};

export default ProductCategoryForm;
