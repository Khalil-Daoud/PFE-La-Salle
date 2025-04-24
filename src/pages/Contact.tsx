
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast.success("Your message has been sent! We'll get back to you soon.");
    form.reset();
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-red-600" />,
      title: "Our Location",
      details: "Franchise Ooredoo El Hamma"
    },
    {
      icon: <Phone className="h-5 w-5 text-red-600" />,
      title: "Phone Number",
      details: "+216 27-985-366"
    },
    {
      icon: <Mail className="h-5 w-5 text-red-600" />,
      title: "Email Address",
      details: "service.zouinkhi@gmail.com"
    },
    {
      icon: <Clock className="h-5 w-5 text-red-600" />,
      title: "Working Hours",
      details: "Monday - Friday: 9AM - 6PM EST"
    }
  ];

  return (
    <>
  <div className='mt-[70px]'>
        <Helmet>
          <title>Contactez-nous | Ooredoo el Hamma</title>
        </Helmet>
        <div className="pt-28 pb-16">
          {/* Hero Section */}
          <div className="container mx-auto px-6 mb-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contactez-nous</h1>
              <p className="text-lg text-muted-foreground">
              Vous avez des questions ou besoin d'aide ? Nous sommes là pour vous aider ! Contactez notre équipe par l'un des moyens ci-dessous..
              </p>
            </div>
          </div>
    
          {/* Contact Information */}
          <div className="container mx-auto px-6 mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
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
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom & Prénom</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
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
                            <Input type="email" placeholder="Your email address" {...field} />
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
                            <Input placeholder="Message subject" {...field} />
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
                              placeholder="Your message" 
                              className="min-h-[120px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full bg-red-600">
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                  </form>
                </Form>
              </div>
              
              {/* Map */}
              <div className="rounded-lg overflow-hidden shadow-sm h-[500px]">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5102.766053729236!2d9.79743097063915!3d33.88373196910922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12559b9c1dc5a733%3A0xe733953d0b081595!2sFranchise%20ooredoo!5e1!3m2!1sfr!2stn!4v1745187152437!5m2!1sfr!2stn" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
    
          
    
          {/* FAQ Section */}
          <div className="container mx-auto px-6 mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { 
                  question: "What are your shipping options?", 
                  answer: "We offer standard (3-5 business days), express (1-2 business days), and international shipping options." 
                },
                { 
                  question: "How can I track my order?", 
                  answer: "Once your order ships, you'll receive a tracking number via email that you can use to monitor your delivery." 
                },
                { 
                  question: "What is your return policy?", 
                  answer: "We offer a 30-day return policy on most items. Products must be in original condition with all packaging." 
                },
                { 
                  question: "Do you offer international shipping?", 
                  answer: "Yes, we ship to most countries worldwide. Shipping rates and delivery times vary by location." 
                }
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
