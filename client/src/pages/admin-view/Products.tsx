import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = {
  image: string | null;
  title: string;
  description: string;
  category: string;
  brand: string;
  salePrice: string;
  totalStock: string;
};

const initialFormData: FormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  salePrice: "",
  totalStock: "",
};

type ProductFormField = {
  id: keyof FormData;
  name: keyof FormData;
  label: string;
  placeholder: string;
  inputType: "text" | "textarea";
};

const productFormData: ProductFormField[] = [
  {
    id: "title",
    name: "title",
    label: "Title",
    placeholder: "Enter title",
    inputType: "text",
  },
  {
    id: "description",
    name: "description",
    label: "Description",
    placeholder: "Enter description",
    inputType: "textarea",
  },
  {
    id: "category",
    name: "category",
    label: "Category",
    placeholder: "Enter category",
    inputType: "text",
  },
  {
    id: "brand",
    name: "brand",
    label: "Brand",
    placeholder: "Enter brand",
    inputType: "text",
  },
  {
    id: "salePrice",
    name: "salePrice",
    label: "Sale Price",
    placeholder: "Enter sale price",
    inputType: "text",
  },
  {
    id: "totalStock",
    name: "totalStock",
    label: "Total Stock",
    placeholder: "Enter total stock",
    inputType: "text",
  },
];

const formSchema = z.object({
  title: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .regex(/^[A-Za-z]+$/, "Title must contain only alphabetic characters."),
  description: z
    .string()
    .regex(
      /^[A-Za-z]+$/,
      "Description must contain only alphabetic characters."
    ),
  category: z
    .string()
    .regex(/^[A-Za-z]+$/, "Category must contain only alphabetic characters."),
  brand: z
    .string()
    .regex(/^[A-Za-z]+$/, "Brand must contain only alphabetic characters."),
  salePrice: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Sale price must be a valid number.")
    .transform((val) => parseFloat(val)),
  totalStock: z
    .string()
    .regex(/^\d+$/, "Total stock must be a valid number.")
    .transform((val) => parseInt(val, 10)),
});

function Products() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialFormData,
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div>
      <Sheet open={true}>
        <SheetContent className="overflow-scroll">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <div className="mt-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                {productFormData.map((data) => (
                  <FormField
                    key={data.id}
                    control={form.control}
                    name={data.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{data.label}</FormLabel>
                        <FormControl>
                          <div>
                            {data.inputType === "text" && (
                              <Input
                                placeholder={data.placeholder}
                                {...field}
                                value={field.value ?? ""}
                              />
                            )}
                            {data.inputType === "textarea" && (
                              <Textarea
                                placeholder={data.placeholder}
                                {...field}
                                value={field.value ?? ""}
                              />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
      Products
    </div>
  );
}

export default Products;
