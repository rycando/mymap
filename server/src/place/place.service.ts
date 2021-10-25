import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { PlaceDTO } from './dto/place.dto';
import { PlaceRepository } from './place.repository';
import { readFileSync } from 'fs';
import { join } from 'path';
import { RegionPlaceDTO } from './dto/regionPlace.dto';
import { PostService } from 'src/post/post.service';

@Injectable()
export class PlaceService {
    constructor(
        private readonly placeRepository: PlaceRepository,
        @Inject(forwardRef(() => PostService))
        private readonly postService: PostService
    ) {}

    private async convertId(regionId: string): Promise<number> {
        const jsonFile = readFileSync(join(process.cwd(), 'regionId.json'), 'utf-8');
        const regionJson = JSON.parse(jsonFile);
        const regionNum = regionJson[regionId];
        if (!regionNum) throw new BadRequestException();
        return regionNum;
    }

    async readPlace(placeId: string): Promise<PlaceDTO> {
        const place$ = await this.placeRepository.findOne(placeId);
        const place = await lastValueFrom(place$);
        place.saved = await this.postService.countSavedPlaces(place.placeId);
        return place;
    }

    async readPlaces(placeIds: string[]): Promise<PlaceDTO[]> {
        const places$ = await this.placeRepository.findWithIds(placeIds);
        const places = await lastValueFrom(places$);
        places.map(async(place) => {
            place.saved = await this.postService.countSavedPlaces(place.placeId);
        })
        return places;
    }

    async searchPlace(query: string, regionId: string, page: number, perPage: number): Promise<PlaceDTO[]> {
        const regionNum = await this.convertId(regionId);
        const places$ = await this.placeRepository.findWithName(query, regionNum, page, perPage);
        const places = await lastValueFrom(places$);
        return places;
    }

    async getPaginator(regionId: string, perPage: number): Promise<string> {
        const regionNum = await this.convertId(regionId);
        const paginator$ = await this.placeRepository.getPaginator(regionNum, perPage);
        return await lastValueFrom(paginator$);
    }

    async readRegionPlaces(paginator: string, page: number): Promise<RegionPlaceDTO> {
        const places$ = await this.placeRepository.findWithRegion(paginator, page);
        const places: PlaceDTO[] = await lastValueFrom(places$);
        places.map(async(place) => {
            place.saved = await this.postService.countSavedPlaces(place.placeId);
        })
        const regionPlace = new RegionPlaceDTO(places, paginator);
        return regionPlace;
    }
}
