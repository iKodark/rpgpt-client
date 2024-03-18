import { CharacterType } from "."

type Match = {
  character: typeof CharacterType,
  createdAt: string,
  updatedAt: string,
  owner: string,
  _id: string
}

declare const MatchType: Match;

export default MatchType;