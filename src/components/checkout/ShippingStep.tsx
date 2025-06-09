import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useCheckout } from "../../context/CheckoutContext";

const shippingSchema = z.object({
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  postalCode: z
    .string()
    .min(3, { message: "Postal code must be at least 3 characters" }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters" }),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

const ShippingStep: React.FC = () => {
  const { checkoutState, saveShippingAddress, saveUserInfo } = useCheckout();

  // Get user data from localStorage
  const getUserFromStorage = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    }
    return null;
  };

  React.useEffect(() => {
    const user = getUserFromStorage();
    if (user) {
      saveUserInfo({
        name: user.name,
        email: user.email,
        userId: user._id,
        isAdmin: user.isAdmin || false,
      });
    }
  }, [saveUserInfo]);

  const form = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      address: checkoutState.shippingAddress.address || "",
      city: checkoutState.shippingAddress.city || "",
      postalCode: checkoutState.shippingAddress.postalCode || "",
      country: checkoutState.shippingAddress.country || "Tunis",
    },
  });

  const onSubmit = (data: ShippingFormData) => {
    // Ensure all required fields are present to match ShippingAddress type
    const shippingData = {
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country,
    };

    saveShippingAddress(shippingData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">
          Informations de livraison
        </h2>
        <p className="text-muted-foreground">
          Où devons-nous envoyer votre commande&nbsp;?
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input placeholder="Franchise Ooredoo El Hamma" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville</FormLabel>
                  <FormControl>
                    <Input placeholder="Tunis" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code postal</FormLabel>
                  <FormControl>
                    <Input placeholder="2000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pays</FormLabel>
                <FormControl>
                  <Input placeholder="Tunisie" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" className="rounded-full" size="lg">
              Continuer vers le paiement
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingStep;
