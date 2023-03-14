import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { StudentService } from "src/student/student.service";
import { AssignStudentsToLessonInput } from "./assignStudentsToLesson.input";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";
import { LessonDocument } from "./schemas/lesson.schema";

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private readonly lessonService: LessonService,
    private readonly studentService: StudentService
  ) {}

  @Query((returns) => LessonType)
  lesson() {
    return {
      id: "axsjdljas12",
      name: "NestJS Class",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString,
    };
  }

  @Mutation((returns) => LessonType)
  createLesson(
    @Args("createLessonInput") createLessonInput: CreateLessonInput
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Query((returns) => LessonType)
  getLesson(@Args("id") id: string) {
    return this.lessonService.getLesson(id);
  }

  @Query((returns) => [LessonType])
  getAllLesson() {
    return this.lessonService.getAllLesson();
  }

  @Mutation((returns) => LessonType)
  assignStudentsToLesson(
    @Args("assignStudentsToLessonInput")
    assignStudentsToLessonInput: AssignStudentsToLessonInput
  ) {
    const { lessonId, studentsIds } = assignStudentsToLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId, studentsIds);
  }

  @ResolveField()
  async studentIds(@Parent() lesson: LessonDocument): Promise<any> {
    return this.studentService.getManyStudents(lesson.studentIds);
  }
}
