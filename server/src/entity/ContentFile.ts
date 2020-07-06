import { Lazy } from './../utils/Lazy';
import { User } from './User';
import { Specialty } from './Specialty';
import { ObjectType, Field, ID, Int } from 'type-graphql';
import { Entity, BaseEntity, Column, ManyToOne, PrimaryGeneratedColumn, ManyToMany, RelationId, JoinColumn, CreateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ContentFile extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @CreateDateColumn({type:'timestamp'})
    @Field(() => Date)
    date: Date;


    @ManyToOne(()=>User, user=> user.uploads, {lazy:true, cascade:true})
    @JoinColumn()
    owner: Lazy<User>;

    @RelationId((contentFile:ContentFile) => contentFile.owner)
    @Field(() => ID, {nullable:true})
    @Column({nullable:true})
    ownerId: number;

    @ManyToMany(()=>Specialty, specialty => specialty.files, {lazy:true})
    @Field(() => [Specialty])
    categories: Lazy<Specialty[]>;

    @Column()
    @Field()
    filetype: string;

    @Column()
    @Field()
    filename: string;

    @Column()
    @Field()
    url: string;

    @Column({default:0})
    @Field(() => Int, {defaultValue:0})
    download_count: number;

    @Column({default:0})
    @Field(() => Int, {defaultValue:0})
    likes: number;

    @Column({default:false})
    @Field({defaultValue:false})
    private: boolean;


    


   

    

}
