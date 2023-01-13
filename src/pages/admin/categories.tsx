import { useQueryClient } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import Head from "next/head";
import React from "react";
import { useController, useForm } from "react-hook-form";
import { number } from "zod";
import { Button } from "../../components/buttons";
import { Table } from "../../components/collections";
import {
  Alert,
  Dialog,
  DialogClose,
  useDialog,
} from "../../components/dialogs";
import { Input, Select } from "../../components/form-controls";
import Checkbox from "../../components/form-controls/checkbox";
import { AdminLayout, NextPageWithLayout } from "../../components/layouts";
import {
  Spinner,
  ToastProvider,
  useToast,
} from "../../components/notification";
import { Show } from "../../components/overlays";
import { trpc } from "../../utils/trpc";

const CategoryForm: React.FC<{
  onSubmit: (category: {
    id?: number;
    name: string;
    hasParent: boolean;
    parentId?: number;
  }) => void;
  options: {
    label: string;
    value: number;
  }[];
  initialValues?: {
    name: string;
    parentId?: number;
  };
}> = ({ onSubmit, options, initialValues }) => {
  const [isSubmitting, setSubmitting] = React.useState(false);
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm<Parameters<typeof onSubmit>["0"]>({
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
  const FormCheckbox = Checkbox<Parameters<typeof onSubmit>["0"]>();
  const submit = async (data: Parameters<typeof onSubmit>["0"]) => {
    setSubmitting(true);
    console.log("Got Ok");
    onSubmit({ ...data });
    setSubmitting(false);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3">
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

const CategoriesPage: NextPageWithLayout = () => {
  const dialog = useDialog({
    title: "Category Form",
  });
  const showToast = useToast((state) => state.showToast);

  // Page Mutations
  const qs = useQueryClient();
  const { mutate: addCategory } = trpc.categories.add.useMutation({
    onSuccess: () => {
      showToast("Category Actions", "Category Added successfuly");
      qs.invalidateQueries([["categories", "list"], { type: "query" }]);
    },
  });
  const addCategoryOnSubmit = React.useCallback(
    (category: { name: string; hasParent: boolean; parentId?: number }) => {
      addCategory(category);
      dialog.setOpen(false);
    },
    []
  );
  const { mutate: deleteCategory } = trpc.categories.delete.useMutation({
    onSuccess: () => {
      showToast("Category Actions", "Category Deleted successfuly");
      qs.invalidateQueries([["categories", "list"], { type: "query" }]);
    },
  });

  // Category List Fetching
  const { data, isLoading } = trpc.categories.list.useQuery();
  const categoriesData = data ? data : [];
  const parentCategories = categoriesData
    .filter((category) => category.parentId === null)
    .map((category) => {
      return { label: category.name, value: category.id };
    });

  // Editing State & callback
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<{
    id: number;
    name: string;
    parentId?: number;
  }>({ id: -1, name: "" });

  const { mutate: editCategory } = trpc.categories.edit.useMutation({
    onSuccess: () => {
      showToast("Category Actions", "Category Edited successfuly");
      qs.invalidateQueries([["categories", "list"], { type: "query" }]);
      setIsEditing(false);
      setSelectedCategory({ id: -1, name: "", parentId: undefined });
    },
  });
  const editCategoryOnSubmit = React.useCallback(
    (category: { name: string; hasParent: boolean; parentId?: number }) => {
      editCategory({ id: selectedCategory.id, ...category });
    },
    [selectedCategory.id]
  );
  const selectCategoryForEdit = React.useCallback((id: number) => {
    setIsEditing(true);
    console.log(id);
    categoriesData.map((category) => {
      if (category.id === id) {
        console.log(category);
        setSelectedCategory({
          id: id,
          name: category.name,
          parentId: category.parentId ? category.parentId : undefined,
        });
      }
    });
  }, []);

  // Table Config
  const columnHelper = createColumnHelper<typeof categoriesData[number]>();
  const columns = [
    columnHelper.accessor("name", {
      header: "Category",
    }),
    columnHelper.accessor("id", {
      header: "",
      cell: (info) => {
        return (
          <span className="ml-2 flex gap-1">
            <Button
              onClick={() => selectCategoryForEdit(info.getValue())}
              className="bi-pencil bg-orange-500 px-2 py-1 text-white hover:bg-orange-400"
            ></Button>
            <Alert
              action={() => deleteCategory(info.getValue())}
              cancelText="Cancel"
              submitText="Delete"
              title="Delete this category"
              classnames={{
                submit: "bg-rose-700 hover:bg-rose-600",
                cancel: "bg-emerald-700 hover:bg-emerald-600",
              }}
              triggerButton={
                <Button className="bi-x bg-rose-700 px-2 py-1 text-white hover:bg-rose-600" />
              }
            />
          </span>
        );
      },
    }),
  ];

  return (
    <>
      <Head>
        <title>Categories List</title>
      </Head>
      <div className="mx-4 mt-4 flex flex-col">
        <ToastProvider>
          <header className="flex gap-6">
            <h1 className="text-2xl font-bold">Product Categories</h1>
            <Dialog
              {...dialog}
              triggerButton={
                <Button
                  onClick={dialog.toggleOpen}
                  className="bg-slate-800 px-4 py-1 text-white hover:bg-slate-700"
                >
                  Add
                </Button>
              }
              closeButton={
                <i
                  onClick={dialog.toggleOpen}
                  className="bi-x absolute top-2 right-2 z-10 cursor-pointer text-2xl text-slate-800 hover:rounded hover:text-rose-600"
                />
              }
            >
              <CategoryForm
                onSubmit={addCategoryOnSubmit}
                options={parentCategories}
              />
            </Dialog>
          </header>
          <section className="flex gap-6">
            <div>
              <Show when={!isLoading} fallback={<Spinner isLoading />}>
                <Table data={categoriesData} columns={columns} />
              </Show>
            </div>
            <aside className="w-1/3">
              <Show when={isEditing} fallback={<></>}>
                <CategoryForm
                  onSubmit={editCategoryOnSubmit}
                  options={parentCategories}
                  initialValues={selectedCategory}
                />
              </Show>
            </aside>
          </section>
        </ToastProvider>
      </div>
    </>
  );
};
CategoriesPage.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};
export default CategoriesPage;
