import { Schema, model } from 'mongoose';
import { mongoosePagination, type Pagination } from 'mongoose-paginate-ts';

import { type IProject } from '../types/IProject';

const ProjectSchema = new Schema<IProject>({
	title: String,
	miniature: String,
	content: String,
	stack: Array,
	path: {
		type: String,
		unique: true,
	},
	created_at: Date,
});

ProjectSchema.plugin(mongoosePagination);

const Project = model<IProject, Pagination<IProject>>('Project', ProjectSchema);

export default Project;
