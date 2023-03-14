import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { v4 as uuid } from "uuid";
import { Student, StudentDocument } from "./schemas/student.schema";
import { CreateStudentInput } from "./student.input";
import { Model } from "mongoose";

@Injectable()
export class StudentService {
  constructor(
    @InjectModel("Student")
    private readonly studentModel: Model<StudentDocument>
  ) {}

  async createStudent(
    createStudentInput: CreateStudentInput
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const newStudent = new this.studentModel({
      id: uuid(),
      firstName,
      lastName,
    });
    return await newStudent.save();
  }

  async getStudent(id: string): Promise<Student> {
    const student = this.studentModel.findOne({ id });
    return student;
  }

  async getAllStudent(): Promise<Student[]> {
    const student = this.studentModel.find();
    return student;
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return await this.studentModel.find({
      id: {
        $in: studentIds,
      },
    });
  }
}
