import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { ENDPOINTS } from "../api/config"; // Use ENDPOINTS

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z
    .string()
    .email({ message: "Veuillez entrer une adresse email valide." }),
  subject: z
    .string()
    .min(5, { message: "L'objet doit contenir au moins 5 caractères." }),
  message: z
    .string()
    .min(10, { message: "Le message doit contenir au moins 10 caractères." }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Submitting contact form:", data);
      const response = await fetch(ENDPOINTS.CONTACT.CREATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Uncomment if protect middleware is used
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Check if response is HTML
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Erreur serveur : réponse non JSON reçue");
        }
        const result = await response.json();
        throw new Error(result.message || "Erreur lors de l'envoi du message");
      }

      const result = await response.json();
      console.log("Contact message sent:", result);
      toast.success(
        "Votre message a été envoyé ! Nous vous répondrons bientôt."
      );
      form.reset();
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      toast.error(
        error.message || "Une erreur est survenue. Veuillez réessayer."
      );
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-red-600" />,
      title: "Notre emplacement",
      details: "Franchise Ooredoo El Hamma",
    },
    {
      icon: <Phone className="h-5 w-5 text-red-600" />,
      title: "Numéro de téléphone",
      details: "+216 27-985-366",
    },
    {
      icon: <Mail className="h-5 w-5 text-red-600" />,
      title: "Adresse email",
      details: "service.zouinkhi@gmail.com",
    },
    {
      icon: <Clock className="h-5 w-5 text-red-600" />,
      title: "Heures d'ouverture",
      details: "Lundi - Vendredi : 9h - 18h EST",
    },
  ];

  return (
    <>
      <div className="mt-[70px]">
        <Helmet>
          <title>Contactez-nous | Ooredoo el Hamma</title>
        </Helmet>
        <div className="pt-28 pb-16">
          {/* Hero Section */}
          <div className="container mx-auto px-6 mb-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Contactez-nous
              </h1>
              <p className="text-lg text-muted-foreground">
                Vous avez des questions ou besoin d'aide ? Nous sommes là pour
                vous aider ! Contactez notre équipe par l'un des moyens
                ci-dessous.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="container mx-auto px-6 mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="bg-card p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    {item.icon}
                    <h3 className="font-semibold ml-2">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{item.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form and Map */}
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Contact Form */}
              <div className="bg-card p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-6">
                  Envoyez-nous un message
                </h2>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom & Prénom</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Votre email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Objet</FormLabel>
                          <FormControl>
                            <Input placeholder="Objet du message" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Votre message"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full bg-red-600">
                      <Send className="mr-2 h-4 w-4" /> Envoyer le message
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Map */}
              <div className="rounded-lg overflow-hidden shadow-sm h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5102.766053729236!2d9.79743097063915!3d33.88373196910922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12559b9c1dc5a733%3A0xe733953d0b081595!2sFranchise%20ooredoo!5e1!3m2!1sfr!2stn!4v1745187152437!5m2!1sfr!2stn"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="container mx-auto px-6 mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Questions fréquemment posées
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  question: "Quelles sont vos options d'expédition ?",
                  answer:
                    "Nous proposons l'expédition standard (3-5 jours ouvrables), express (1-2 jours ouvrables) et internationale.",
                },
                {
                  question: "Comment puis-je suivre ma commande ?",
                  answer:
                    "Une fois votre commande expédiée, vous recevrez un numéro de suivi par email pour suivre la livraison.",
                },
                {
                  question: "Quelle est votre politique de retour ?",
                  answer:
                    "Nous offrons une politique de retour de 30 jours pour la plupart des articles, à condition qu'ils soient dans leur état d'origine avec l'emballage.",
                },
                {
                  question: "Proposez-vous l'expédition internationale ?",
                  answer:
                    "Oui, nous expédions dans la plupart des pays du monde. Les tarifs et délais varient selon la destination.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
