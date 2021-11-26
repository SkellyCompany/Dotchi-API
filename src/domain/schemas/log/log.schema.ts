import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema({ collection: 'logs' })
export class Log {
	@Prop()
	dotchi_id: string;

	@Prop()
	name: string;

	@Prop()
	description: string;

	@Prop()
	parameters: Map<string, string>;

	@Prop()
	timestamp: number;
}

export const LogSchema = SchemaFactory.createForClass(Log);
