import { SocialLinkService } from './social_link.service';
import { CreateSocialLinkDto } from './dto/create-social_link.dto';
import { UpdateSocialLinkDto } from './dto/update-social_link.dto';
export declare class SocialLinkController {
    private readonly socialLinkService;
    constructor(socialLinkService: SocialLinkService);
    create(createSocialLinkDto: CreateSocialLinkDto): Promise<import("./models/social_link.model").SocialLink>;
    findAll(): Promise<import("./models/social_link.model").SocialLink[]>;
    findOne(id: string): Promise<import("./models/social_link.model").SocialLink | null>;
    update(id: string, updateSocialLinkDto: UpdateSocialLinkDto): Promise<import("./models/social_link.model").SocialLink>;
    remove(id: string): Promise<number>;
}
