import { SignupInput } from './signup';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthInput extends PartialType(SignupInput) {
  @Field(() => Int)
  id: number;
}
