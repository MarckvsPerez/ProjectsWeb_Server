import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

import { type IProject } from '../types/IProject';

const ProjectSchema = new Schema({
	title: String,
	miniature: String,
	content: String,
	path: {
		type: String,
		unique: true,
	},
	created_at: Date,
});

ProjectSchema.plugin(mongoosePaginate);

const Project = model<IProject>('Project', ProjectSchema);

export default Project;
