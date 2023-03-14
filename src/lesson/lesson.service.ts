import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Lesson, LessonDocument, LessonSchema } from "./schemas/lesson.schema";
import { v4 as uuid } from "uuid";
import { CreateLessonInput } from "./lesson.input";

@Injectable()
export class LessonService {
  constructor(
    @InjectModel("Lesson")
    private readonly lessonModel: Model<LessonDocument>,
  ) {}

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate,studentIds} = createLessonInput; const newLesson = new this.lessonModel({
      id: uuid(),
      name,
      startDate,
      endDate,
      studentIds
    });
    return await newLesson.save();
  }

  async getLesson(id: string): Promise<Lesson> {
    const lesson = await this.lessonModel.findOne({ id });
    return lesson;
  }

  async getAllLesson(): Promise<Lesson[]> {
    const lesson = await this.lessonModel.find();
    return lesson;
  }

  async assignStudentsToLesson(
    lessonId: string,
    studentIds: string[]
  ): Promise<Lesson> {
    const lesson = await this.lessonModel.findOneAndUpdate(
      { id: lessonId },
      {
        $push: { studentIds: studentIds },
      },
      { new: true }
    );
    return lesson;
  }

}
