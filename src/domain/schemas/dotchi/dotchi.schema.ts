import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DotchiDocument = Dotchi & Document;

@Schema({ collection: 'dotchis' })
export class Dotchi {
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

export const DotchiSchema = SchemaFactory.createForClass(Dotchi);
