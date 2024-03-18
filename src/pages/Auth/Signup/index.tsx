import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { InputPassword } from "@/components/ui/input-password";
import { toast } from "sonner"

import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Auth } from "@/services";
import { AxiosError } from "axios";

import schema from "./schema";

interface IFormInput {
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}

const Signup = () => {
  const navigate = useNavigate();

  const form = useForm<IFormInput>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema)
  });

  const handleErrorSignup = (error: AxiosError | any) => {
    if (error.response?.status === 409) {
      const field = error.response?.data?.field;

      toast.error("Usuário já existe.", {
        description: `Já existe um usuário com este ${field}. Tente outro!`,
      });
    }
  }

  const handleSuccessSignup = () => {
    toast.success("Usuário criado com sucesso.", {
      description: "Você será redirecionado para realizar seu login.",
    })

    navigate("/")
  }

  const mutation = useMutation({
    mutationFn: Auth.Signup,
    retry: false,
    onError: handleErrorSignup,
    onSuccess: handleSuccessSignup
  });

  const onSubmit: SubmitHandler<IFormInput> = async (values) => {
    await mutation.mutateAsync(values);

    return;
  }

  const handleClickLogin = () => {
    navigate("/");
  }

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-5 border-2 rounded-none p-5 w-1/4"
        >
          <span className="text-3xl font-semibold text-center">Crie sua conta</span>
          <Input
            name="username"
            label="Usuário"
            placeholder="Insira um nome de usuário"
            type="text"
          />
          <Input
            name="email"
            label="E-mail"
            placeholder="name@host.com"
            type="text"
          />
          <InputPassword
            name="password"
            label="Senha"
            placeholder="Insira uma senha"
          />
          <InputPassword
            name="confirmPassword"
            label="Confirme sua senha"
            placeholder="Confirme sua senha"
          />
          <Button
            type="button"
            variant="link"
            className="self-end"
            onClick={handleClickLogin}
          >
            Já tem uma conta? Acesse aqui
          </Button>
          <Button
            type="submit"
            className="p-5 rounded-none"
          >
            Criar conta
          </Button>
        </form>
      </FormProvider>
    </>
  )
}

export default Signup;