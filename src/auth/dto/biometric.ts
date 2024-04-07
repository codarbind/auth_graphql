import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class CaptureBioInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'processed biometric capture' })
  biometricKey: string;
}
