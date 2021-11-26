import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class DotchiState {
	@Prop()
	alive: boolean;
}

export const DotchiStateSchema = SchemaFactory.createForClass(DotchiState);
