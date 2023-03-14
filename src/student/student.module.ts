import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentSchema } from "./schemas/student.schema";
import { StudentResolver } from "./student.resolver";
import { StudentService } from "./student.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Student", schema: StudentSchema }]),
  ],
  providers: [StudentResolver, StudentService],
  exports:[StudentService]
})
export class StudentModule {}
