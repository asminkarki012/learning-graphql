import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type StudentDocument = Student & Document;

@Schema({
  timestamps: true,
})
export class Student {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
