import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class SignupInput {
  @IsEmail()
  @Field(() => String, { description: 'Email address' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'plain password from user' })
  password: string;
}
