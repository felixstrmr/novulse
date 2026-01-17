"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { createAssetAction } from "@/actions/create-asset-action";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createAssetSchema } from "@/schemas/create-asset-schema";
import type {
  AssetCategory,
  AssetLocation,
  AssetManufacturer,
  AssetModel,
  AssetStatus,
} from "@/types";

export default function CreateAssetForm({
  categories,
  manufacturers,
  models,
  statuses,
  locations,
}: {
  categories: AssetCategory[];
  manufacturers: AssetManufacturer[];
  models: AssetModel[];
  statuses: AssetStatus[];
  locations: AssetLocation[];
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof createAssetSchema>>({
    resolver: zodResolver(createAssetSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      type: "hardware",
      manufacturer: "",
      model: "",
      status: "",
      location: undefined,
      assigned_to: undefined,
    },
  });

  const { execute, isExecuting } = useAction(createAssetAction, {
    onExecute: () => {
      toast.loading("Creating asset...", {
        id: "create-asset-form",
      });
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: "create-asset-form",
      });
    },
    onSuccess: ({ data }) => {
      toast.success("Asset created successfully", {
        id: "create-asset-form",
      });
      router.push(data.id);
    },
  });

  return (
    <form onSubmit={form.handleSubmit(execute)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...field}
                autoFocus
                disabled={isExecuting}
                id="name"
                placeholder="Asset name"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="category"
          render={({ field, fieldState }) => {
            const selectedCategory = categories.find(
              (category) => category.id === field.value
            );
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="category">Category</FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
                <Select
                  name={field.name}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Select category">
                      {selectedCategory ? selectedCategory.name : null}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            );
          }}
        />
        <Controller
          control={form.control}
          name="status"
          render={({ field, fieldState }) => {
            const selectedStatus = statuses.find(
              (status) => status.id === field.value
            );
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="status">Status</FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
                <Select
                  name={field.name}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Select status">
                      {selectedStatus ? selectedStatus.name : null}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    {statuses.map((status) => (
                      <SelectItem key={status.id} value={status.id}>
                        {status.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            );
          }}
        />
        <div className="flex gap-4">
          <Controller
            control={form.control}
            name="manufacturer"
            render={({ field, fieldState }) => {
              const selectedManufacturer = manufacturers.find(
                (category) => category.id === field.value
              );
              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor="manufacturer">Manufacturer</FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select manufacturer">
                        {selectedManufacturer
                          ? selectedManufacturer.name
                          : null}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                      {manufacturers.map((manufacturer) => (
                        <SelectItem
                          key={manufacturer.id}
                          value={manufacturer.id}
                        >
                          {manufacturer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              );
            }}
          />
          <Controller
            control={form.control}
            name="model"
            render={({ field, fieldState }) => {
              const selectedModel = models.find(
                (model) => model.id === field.value
              );
              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor="model">Model</FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select model">
                        {selectedModel ? selectedModel.name : null}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                      {models.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              );
            }}
          />
        </div>
        <Controller
          control={form.control}
          name="location"
          render={({ field, fieldState }) => {
            const selectedLocation = locations.find(
              (location) => location.id === field.value
            );
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="location">Location</FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
                <Select
                  name={field.name}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Select location">
                      {selectedLocation ? selectedLocation.name : null}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            );
          }}
        />
        <Field className="mt-4">
          <Button isLoading={isExecuting} type="submit">
            Create Asset
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
