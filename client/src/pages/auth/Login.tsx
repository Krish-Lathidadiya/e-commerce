import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, selectIsLoading } from "@/features/auth/authSlice";
import { AppDispatch } from "@/store/store";
import Loader from "@/components/common/Loader";
import { useToast } from "@/hooks/use-toast";
// Zod schema for validation
const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .regex(/^[A-Za-z]+$/, {
      message: "Username must contain only alphabetic characters.",
    }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (formData: any) => {
    try {
      const userData = await dispatch(loginAsync(formData)).unwrap();
      if (userData) {
        navigate("/shop/home");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error,
      });
    }
  };
  return (
    <div className="">
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="bg-white w-96 p-8 border border-gray-300 shadow-lg rounded-lg space-y-3">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Login User
            </h1>
            <p>
              Dont't have an account{" "}
              <Link
                to={"/auth/register"}
                className="font-medium text-primary hover:underline ml-1"
              >
                Register
              </Link>
            </p>
          </div>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Username field with validation */}
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
                <Button disabled={isLoading} type="submit" className="mt-4 w-full">
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

export default Login;
