import { useForm, SubmitHandler } from "react-hook-form"

import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { InputPassword } from "@/components/ui/inputPassword";
import { toast } from "sonner"

import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Auth, Storage } from "../../../services";
import { AxiosError, AxiosResponse } from "axios";

interface IFormInput {
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}

const Signup = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5 border-2 rounded-none p-5 w-1/4"
      >
        <span className="text-3xl font-semibold text-center">Crie sua conta</span>
        <Input
          placeholder="Insira um username"
          type="text"
          {...register("username")}
        />
        <Input
          placeholder="Insira um e-mail"
          type="text"
          {...register("email")}
        />
        <InputPassword
          placeholder="Insira uma senha"
          {...register("password")}
        />
        <InputPassword
          placeholder="Confirme sua senha"
          {...register("confirmPassword")}
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
    </>
  )
}

export default Signup;