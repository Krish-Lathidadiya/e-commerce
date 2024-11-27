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
import { registerAsync, selectIsLoading } from "@/features/auth/authSlice";
import { AppDispatch } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import Loader from "@/components/common/Loader";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" })
    .regex(/^[A-Za-z]+$/, {
      message: "Username must contain only alphabetic characters.",
    }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const onSubmit = async (formData: any) => {
    try {
      const userData = await dispatch(registerAsync(formData)).unwrap();
      if (userData) {
        toast({
          title: "Registration successful!",
          description: "You can now log in.",
        });
        navigate("/auth/login");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error,
      });
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="bg-white w-96 p-8 border border-gray-300 shadow-lg rounded-lg space-y-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Create new user
            </h1>
            <p>
              Already have an account{" "}
              <Link
                to={"/auth/login"}
                className="font-medium text-primary hover:underline ml-1"
              >
                Login
              </Link>
            </p>
          </div>
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Username field */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit button */}
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="mt-4 w-full"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
