import React from "react";

import { useForm, SubmitHandler, FormProvider, useWatch } from "react-hook-form"

import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from "axios";

import { useMutation } from '@tanstack/react-query';
import { Rpg } from "@/services";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from "@/components/ui/input";
import { InputNumber } from "@/components/ui/input-number";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import * as constants from "@/constants";
import * as schema from "./schema";
import { ZodError, setErrorMap } from "zod";

interface IFormInput {
  name: string,
  race: string,
  occupation: string,
  points: {
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
    available: 27
  },
  lore: string
}

const Create = () => {
  const navigate = useNavigate();
  const [availablePoints, setAvailablePoints] = React.useState<number>(27);

  const maxPoints = 75;

  const form = useForm<IFormInput>({
    defaultValues: {
      name: "",
      race: "",
      occupation: "",
      points: {
        strength: 8,
        dexterity: 8,
        constitution: 8,
        intelligence: 8,
        wisdom: 8,
        charisma: 8
      },
      lore: "",
    }
  });

  const points = useWatch({ name: "points", control: form.control });

  const handleSuccessCreateLore = (response: AxiosResponse) => {
    console.log("RESPONSE", response);
    form.setValue("lore", response.data.lore);
  }

  const mutation = useMutation({
    mutationFn: Rpg.CreateLore,
    retry: false,
    onSuccess: handleSuccessCreateLore
  });

  const handleGenerateLore = async () => {
    const [name, race, occupation] = form.getValues(["name", "race", "occupation"]);

    try {
      schema.lore.parse({ name, race, occupation });

      form.clearErrors();

      await mutation.mutateAsync({
        "name": name,
        "race": race,
        "occupation": occupation
      });
    } catch (error) {
      if (error instanceof ZodError) {
        error.issues.forEach((issue: any) => form.setError(issue.path[0], { type: "manual", message: "Field is required" }))
      }
    }

    return
  }

  const onSubmit: SubmitHandler<IFormInput> = async (values) => {
    // await mutation.mutateAsync(values);
    console.log("VALUES", values);
    return;
  }

  React.useMemo(() => {
    const currentPointsUsed = Object.values(points).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    setAvailablePoints(maxPoints - currentPointsUsed);
  }, [points])

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 w-full border-2 rounded p-5"
        >
          <div className="border-2 rounded p-5">
            <span className="text-3xl font-semibold">Dados básicos do personagem</span>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <Select
                name="race"
                label="Raça"
                placeholder="Selecione a raça do seu personagem"
              >
                <SelectContent>
                  {
                    constants.races.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <Select
                name="occupation"
                label="Classe"
                placeholder="Selecione a classe do seu personagem"
              >
                <SelectContent>
                  {
                    constants.occupations.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <Input
                name="name"
                label="Nome"
                type="text"
                placeholder="Insira o nome do seu personagem"
              />
            </div>
          </div>
          <div className="border-2 rounded p-5">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-semibold">Pontos do personagem</span>
              <span className="text-3xl font-semibold">
                <span className="text-primary">{availablePoints} </span>
                Pontos disponíveis</span>
            </div>
            <div className="grid grid-cols-6 gap-4 mt-4">
              <InputNumber
                name="points.strength"
                label="Força"
                max={15}
                min={8}
                disabledAdd={availablePoints <= 0}
              />
              <InputNumber
                name="points.dexterity"
                label="Destreza"
                max={15}
                min={8}
                disabledAdd={availablePoints <= 0}
              />
              <InputNumber
                name="points.constitution"
                label="Constituição"
                max={15}
                min={8}
                disabledAdd={availablePoints <= 0}
              />
              <InputNumber
                name="points.intelligence"
                label="Inteligência"
                max={15}
                min={8}
                disabledAdd={availablePoints <= 0}
              />
              <InputNumber
                name="points.wisdom"
                label="Sabedoria"
                max={15}
                min={8}
                disabledAdd={availablePoints <= 0}
              />
              <InputNumber
                name="points.charisma"
                label="Carisma"
                max={15}
                min={8}
                disabledAdd={availablePoints <= 0}
              />
            </div>
          </div>
          <div className="border-2 rounded p-5">
            <div className="flex flex-col space-y-4 w-full">
              <span className="text-3xl font-semibold">História do personagem</span>
              <Textarea
                rows={20}
                disabled={mutation.isPending}
                {...form.register("lore")}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleGenerateLore}
                disabled={mutation.isPending}
                className="self-end"
              >
                {
                  mutation.isPending ? "Gerando história" : "Gerar história"
                }
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="self-end"
          >
            Criar ficha
          </Button>
        </form>
      </FormProvider>
    </>
  )
}

export default Create;
