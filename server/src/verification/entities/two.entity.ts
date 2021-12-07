import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Two {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    TwoId: number;
    
    @ApiProperty()
    @Column()
    regionId: string;

    @ApiProperty()
    @Column()
    regionName: string;

    @ApiProperty()
    @Column()
    placeName: string;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty()
    @DeleteDateColumn()
    deletedAt: Date;
}