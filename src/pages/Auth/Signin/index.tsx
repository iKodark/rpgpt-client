import { useForm, SubmitHandler } from "react-hook-form"

import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { InputPassword } from "@/components/ui/input-password";
import { toast } from "sonner"

import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Auth, Storage } from "../../../services";
import { AxiosError, AxiosResponse } from "axios";

interface IFormInput {
  login: string,
  password: string
}

const Signin = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      login: "",
      password: ""
    }
  });

  const handleErrorSignin = (error: AxiosError) => {
    if (error.response?.status === 401) {
      toast.error("Login inválido.", {
        description: "Verifique seu e-mail/username e senha e tente novamente.",
      });
    }
  }

  const handleSuccessSignin = (response: AxiosResponse) => {
    Storage.setAccessToken(response.data.token);

    toast.success("Logado com sucesso.", {
      description: "Seja bem-vindo(a).",
    })

    navigate("/dashboard")
  }

  const mutation = useMutation({
    mutationFn: Auth.Signin,
    retry: false,
    onError: handleErrorSignin,
    onSuccess: handleSuccessSignin
  });

  const onSubmit: SubmitHandler<IFormInput> = async (values) => {
    await mutation.mutateAsync(values);

    return;
  }

  const handleClickRegister = () => {
    navigate("/register");
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5 border-2 rounded-none p-5 w-1/4"
      >
        <span className="text-3xl font-semibold text-center">Acesse sua conta</span>
        <Input
          placeholder="Insira seu e-mail/username"
          type="text"
          {...register("login")}
        />
        <InputPassword
          placeholder="Insira sua senha"
          {...register("password")}
        />
        <Button
          type="button"
          variant="link"
          className="self-end"
          onClick={handleClickRegister}
        >
          Crie sua conta
        </Button>
        <Button
          type="submit"
          className="p-5 rounded-none"
        >
          Acessar
        </Button>
      </form>
    </>
  )
}

export default Signin;