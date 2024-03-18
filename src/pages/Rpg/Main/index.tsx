import React from 'react'

import { useQuery } from '@tanstack/react-query';
import { Rpg } from "@/services";
import { Button } from '@/components/ui/button';

import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { MatchType } from "@/types";

const Main = () => {
  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['list'],
    queryFn: Rpg.List,
  });

  console.log(data);

  const handleClickNewStory = () => {
    navigate("create");
  }

  if (isLoading) {
    return (
      <>IS LOADING...</>
    )
  }

  const matches: Array<typeof MatchType> = data?.data.matches;

  return (
    <>
      <Button
        onClick={handleClickNewStory}
      >
        Criar nova história
      </Button>
      <div className="grid grid-cols-4 auto-rows-fr gap-4">
        {
          matches.map(({ character, _id }: typeof MatchType) => (
            <Card key={_id}>
              <CardHeader>
                <CardTitle>{character.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{character.race}</p>
                <p>{character.occupation}</p>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </>
  )
}

export default Main;
