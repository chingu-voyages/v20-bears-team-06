import { JoinTable } from 'typeorm';
import { Lazy } from './../utils/Lazy';
import { User } from './User';
import { Specialty } from './Specialty';
import { ObjectType, Field, ID, Int, ArgsType, Args } from 'type-graphql';
import { Entity, RelationCount, BaseEntity, Column, ManyToOne, PrimaryGeneratedColumn, ManyToMany, RelationId, JoinColumn, CreateDateColumn } from 'typeorm';


@ArgsType()
export class SaveContentArgs{
    @Field(() => ID)
    userId: number;

    @Field()
    actionType: string;

    @Field(() => ID)
    fileId: number;

  
}




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

    @ManyToMany(() => User, user => user.savedContent, {lazy:true, cascade:true} )
    @JoinTable()
    @Field(() => [User])
    savedBy: Lazy<User[]>;

    @RelationCount((contentFile:ContentFile) => contentFile.savedBy)
    @Field({defaultValue:0})
    save_count: number;

    
    @RelationId((contentFile:ContentFile) => contentFile.savedBy)
    @Field(() => [ID],{nullable:true})
    savedByIds: number[];


    @Field({nullable:true})
    @Column({nullable:true})
    gradeLevel: string;

    @Field({nullable:true})
    @Column({nullable:true})
    description: string;

    

    @ManyToMany(() => User, user => user.favoriteContent, {lazy:true, cascade:true} )
    @JoinTable()
    @Field(() => [User])
    favoritedBy: Lazy<User[]>;

    @RelationId((contentFile:ContentFile) => contentFile.favoritedBy)
    @Field(() => [ID],{nullable:true})
    favoritedByIds: number[];

    @RelationCount((contentFile:ContentFile) => contentFile.favoritedBy)
    @Field()
    favorite_count: number;

    @ManyToMany(()=>Specialty, specialty => specialty.files, {lazy:true})
    @Field(() => [Specialty])
    categories: Lazy<Specialty[]>;

    @Column({nullable:true})
    @Field({nullable:true})
    filetype: string;

    @Column({nullable:true})
    @Field({nullable:true})
    filename: string;

    

    @Column({nullable:true})
    @Field({nullable:true})
    signedRequest: string;

    @Column({nullable:true})
    @Field({nullable:true})
    key: string;

    @Column({default:0})
    @Field(() => Int, {defaultValue:0})
    download_count: number;

    @Column({default:0})
    @Field(() => Int, {defaultValue:0})
    likes: number;

    @Column({default:false})
    @Field({defaultValue:false})
    private: boolean;




    static async fileAction(@Args() {userId,fileId, actionType}:SaveContentArgs):
    Promise<ContentFile|undefined>{
        if (actionType==='save'){
        let user = await User.findOne(userId,{relations:['savedContent']});
        let file = await this.findOne(fileId, {relations:['savedBy']});
        let owner = await file?.owner;
        if (user&&file&&owner){
            let content = await user.savedContent;
            let savedBy = await file.savedBy;
            let uploads = await owner.uploads;
            if (content&&savedBy&&uploads){
              
                content.push(file);
                user.savedContent = content;
              
                file.owner = owner;
                await file.save();
                await user.save();
                await owner.save();

                let updatedFile = await this.findOne(fileId);
                if (updatedFile){
                    
                    
                    return updatedFile;
                }
            }
        }
        return;}

        if (actionType='favorite'){
            let user = await User.findOne(userId,{relations:['favoriteContent']});
        
        let file = await this.findOne(fileId, {relations:['favoritedBy']});
        let owner = await file?.owner;
        if (user&&file&&owner){
            let content = await user.favoriteContent;
            let favoritedBy = await file.favoritedBy;
            let uploads = await owner.uploads;
            if (content&&favoritedBy&&uploads){
                content.push(file);
                user.favoriteContent = content;
                file.owner = owner;
                await file.save();
                await user.save();
                await owner.save();
                let updatedFile = await this.findOne(fileId);
                if (updatedFile){
                    
                    return updatedFile;
                }
            }
        }
        return;

        }

        return;
    }


   

    

}
