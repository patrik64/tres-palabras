import { Entity, Fields } from 'remult';

@Entity<Lesson>('lessons', {
	allowApiCrud: true,
	id: { monday: true },
	defaultOrderBy: { monday: 'asc' }
})
export class Lesson {
	@Fields.string()
	monday = ''; // 'YYYY-MM-DD' (local date, always a Monday)

	@Fields.string()
	spanish1 = '';

	@Fields.string()
	spanish2 = '';

	@Fields.string()
	spanish3 = '';

	@Fields.string()
	english1 = '';

	@Fields.string()
	english2 = '';

	@Fields.string()
	english3 = '';

	@Fields.updatedAt()
	updatedAt?: Date;
}
