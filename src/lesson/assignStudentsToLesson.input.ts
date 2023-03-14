import { InputType, Field, ID } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class AssignStudentsToLessonInput {
  @IsUUID()
  @Field((type) => ID)
  lessonId: string;

  @IsUUID("4", { each: true }) //validating array of UUID for version 4
  @Field((type) => [ID])
  studentsIds: string[];
}
