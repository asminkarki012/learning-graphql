import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver()
export class StudentResolver {
    constructor(private readonly studentService:StudentService){}

  @Mutation((returns) => StudentType)
  createStudent(
    @Args("createStudentInput") createStudentInput: CreateStudentInput
  ) {
    return this.studentService.createStudent(createStudentInput);
  }

  @Query((returns) => StudentType)
  getStudent(@Args("id") id: string) {
    return this.studentService.getStudent(id);
  }


  @Query((returns) => [StudentType])
  getAllStudent() {
    return this.studentService.getAllStudent();
  }

}
