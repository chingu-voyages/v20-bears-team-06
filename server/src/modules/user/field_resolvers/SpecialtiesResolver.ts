import { Resolver, FieldResolver, Root, Query } from 'type-graphql';
import { User } from '../../../entity/User';
import { Specialty } from '../../../entity/Specialty';

@Resolver(User)
export class SpecialtiesResolver {
  @FieldResolver(() => [Specialty])
  @Query(() => [Specialty])
  async getSpecialties(@Root() user: User): Promise<Specialty[] | undefined> {
    let specs = await user.specialties;
    if (!specs) return undefined;

    return specs;
  }
}
