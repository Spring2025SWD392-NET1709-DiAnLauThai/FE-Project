import { TShirt, TShirtSchema } from "@/domains/schemas/t-shirt.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTshirtMutation } from "./use-tshirt";

export const useTshirtForm = (id?: string) => {
  const { createTshirt, updateTshirt } = useTshirtMutation();
  const form = useForm<TShirt>({
    resolver: zodResolver(TShirtSchema),
    defaultValues: {
      description: "",
      imgurl: "",
      tshirtname: "",
      colorlist: [],
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log("Saving design:", data);
    // if (id) {
    //   updateTshirt.mutate({ id, data });
    // } else {
    //   createTshirt.mutate(data);
    // }
  });

  return {
    form,
    onSubmit,
    isLoading: createTshirt.isPending || updateTshirt.isPending,
  };
};
