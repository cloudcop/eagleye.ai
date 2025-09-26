"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { showSuccess } from "@/utils/toast";

const formSchema = z.discriminatedUnion("customerType", [
  z.object({
    customerType: z.literal("residential"),
    fullName: z.string().min(2, { message: "Full name is required." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    message: z.string().optional(),
  }),
  z.object({
    customerType: z.literal("business"),
    fullName: z.string().min(2, { message: "Full name is required." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    businessName: z.string().min(2, { message: "Business name is required." }),
    shopType: z.enum(["retail", "off-license", "restaurant", "corporate-office", "other"]),
    postcode: z.string().min(5, { message: "Please enter a valid postcode." }),
    camerasRequired: z.coerce.number().min(1, { message: "At least one camera is required." }),
    adminUsers: z.coerce.number().min(1, { message: "At least one admin is required." }),
    viewerUsers: z.coerce.number().min(0),
    message: z.string().optional(),
  }),
]);

export const BookPilotDialog = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerType: "business",
      fullName: "",
      email: "",
      phone: "",
      businessName: "",
      postcode: "",
      camerasRequired: 1,
      adminUsers: 1,
      viewerUsers: 0,
      message: "",
    },
  });

  const customerType = form.watch("customerType");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Pilot Booking Submission:", values);
    showSuccess("Request submitted! We'll be in touch soon.");
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-cyan-400 text-black hover:bg-cyan-500 animate-button-glow" size="lg">
          Book a Pilot
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Book a Pilot Program</DialogTitle>
          <DialogDescription>
            Fill out the form below to get started with Eagleye.ai. We'll contact you to discuss your needs.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ScrollArea className="h-[60vh] pr-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="customerType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>I am a...</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="business" />
                            </FormControl>
                            <FormLabel className="font-normal">Business</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="residential" />
                            </FormControl>
                            <FormLabel className="font-normal">Residential Customer</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {customerType === "business" && (
                  <>
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Acme Retail" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shopType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type of Business</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a business type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="off-license">Off License</SelectItem>
                              <SelectItem value="restaurant">Restaurant</SelectItem>
                              <SelectItem value="corporate-office">Corporate Office</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="postcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postcode</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. BS1 4DJ" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. John Smith" {...field} />
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
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 07123 456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {customerType === "business" && (
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="camerasRequired"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cameras</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="adminUsers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Admins</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="viewerUsers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Viewers</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your specific needs or questions."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};