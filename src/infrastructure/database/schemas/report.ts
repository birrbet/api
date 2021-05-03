import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { IReport, ReportType } from "src/core/models/entities/report";
import { DocumentBase } from "../base-classes/document.base";
import { Schema } from "@nestjs/mongoose";

@Schema({timestamps: true, id: true})
export class Report extends DocumentBase implements IReport {
    @Prop({type: String, enum: ReportType, required: true})
    reportType: ReportType;
    @Prop({type: String, required: true})
    value: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);