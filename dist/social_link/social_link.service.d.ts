import { CreateSocialLinkDto } from "./dto/create-social_link.dto";
import { UpdateSocialLinkDto } from "./dto/update-social_link.dto";
import { SocialLink } from "./models/social_link.model";
export declare class SocialLinkService {
    private socialLinkModel;
    constructor(socialLinkModel: typeof SocialLink);
    create(createSocialLinkDto: CreateSocialLinkDto): Promise<SocialLink>;
    findAll(): Promise<SocialLink[]>;
    findOne(id: number): Promise<SocialLink | null>;
    update(id: number, updateSocialLinkDto: UpdateSocialLinkDto): Promise<SocialLink>;
    remove(id: number): Promise<number>;
}
