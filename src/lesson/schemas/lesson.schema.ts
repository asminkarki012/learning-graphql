import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type LessonDocument = Lesson & Document;

@Schema({
  timestamps: true,
})
export class Lesson {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  startDate: string;

  @Prop({ type: String })
  endDate: string;

  @Prop({ type: [String], default: [] })
  studentIds: [string];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
