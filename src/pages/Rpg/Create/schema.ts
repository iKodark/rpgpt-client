import { z } from "zod";

import * as constants from "@/constants";

const RacesEnum = constants.races.map((option) => option.value) as [string, ...string[]];

const OccupationsEnum = constants.occupations.map((option) => option.value) as [string, ...string[]];

const lore = z.object({
  name: z
    .string()
    .min(3, { message: "Name is too short, min 3" }),
  race: z
    .enum(RacesEnum),
  occupation: z
    .enum(OccupationsEnum),
});

export {
  lore
}