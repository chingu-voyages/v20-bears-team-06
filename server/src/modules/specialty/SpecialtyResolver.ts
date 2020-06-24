import { Resolver, Arg, Mutation, Query, ID } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Specialty } from '../../entity/Specialty';
import { User } from '../../entity/User';
import { SpecialtyInput } from '../specialty/SpecialtyInput';

@Resolver(Specialty)
export class SpecialtyResolver {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtyRepo: Repository<Specialty>
  ) {}

  @Query(() => Specialty, { nullable: true })
  specialty(@Arg('specId', () => ID) specId: string) {
    return this.specialtyRepo.findOne(specId);
  }

  @Mutation(() => Specialty)
  async addSpecialty(
    @Arg('data')
    { title, subtitle }: SpecialtyInput
  ): Promise<Specialty | Object | undefined> {
    title = title.toUpperCase(),
    subtitle = subtitle.toUpperCase() || '';
    let spec = await Specialty.findOne({ where: { title, subtitle } });
    if (spec) {
      return Object.assign({ message: 'specialty already exists' }, spec);
    } else {
      spec = await Specialty.create({
        title: title,
        subtitle: subtitle,
      }).save();

      if (!spec) return undefined;
      return spec;
    }
  }

  @Mutation(() => User)
  async addUserSpecialty(
    @Arg('data')
    { title, subtitle, userId }: SpecialtyInput
  ): Promise<User | undefined> {
    let spec = await Specialty.findOne({ where: { title, subtitle } });
    if (!spec) {
      spec = await Specialty.create({
        title: title,
        subtitle: subtitle,
      }).save();
    }
    let user = await User.findOne(userId);
    if (!user) return undefined;
    if (spec && user) {
      (await user.specialties).push(spec);
      user = await user.save();
      if (!user) {
        return undefined;
      }

      return user;
    }

    return undefined;
  }
}
